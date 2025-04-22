import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, StyleSheet, ActivityIndicator,
  TouchableOpacity, TextInput, RefreshControl, Pressable
} from 'react-native';

const API_KEY = 'bc894a75c63a435bb1c122959240908';
const cidades = ['São Paulo', 'Rio de Janeiro', 'Salvador', 'Recife', 'Curitiba'];

export default function App() {
  const [lista, setLista] = useState([]);
  const [filtradas, setFiltradas] = useState([]);
  const [busca, setBusca] = useState('');
  const [detalhe, setDetalhe] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [erro, setErro] = useState('');

  const carregarCidades = async () => {
    setCarregando(true);
    setErro('');
    try {
      const todas = await Promise.all(
        cidades.map(cidade =>
          fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cidade}&lang=pt`)
            .then(res => res.json())
        )
      );
      setLista(todas);
      setFiltradas(todas);
    } catch (e) {
      setErro('Erro ao buscar dados');
    }
    setCarregando(false);
  };

  useEffect(() => {
    carregarCidades();
  }, []);

  const buscar = (texto) => {
    setBusca(texto);
    const resultado = lista.filter(item =>
      item.location.name.toLowerCase().includes(texto.toLowerCase())
    );
    setFiltradas(resultado);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await carregarCidades();
    setRefreshing(false);
  };

  const abrirDetalhes = async (cidade) => {
    setDetalhe(null);
    setCarregando(true);
    try {
      const res = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cidade}&lang=pt`);
      const dados = await res.json();
      setDetalhe(dados);
    } catch {
      setErro('Erro ao buscar detalhes');
    }
    setCarregando(false);
  };

  if (detalhe) {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>{detalhe.location.name}</Text>
        <Text style={styles.texto}>🌡️ {detalhe.current.temp_c}°C</Text>
        <Text style={styles.texto}>🌥️ {detalhe.current.condition.text}</Text>
        <Text style={styles.texto}>💧 Umidade: {detalhe.current.humidity}%</Text>
        <Text style={styles.texto}>💨 Vento: {detalhe.current.wind_kph} km/h</Text>
        <Text style={styles.texto}>📍 País: {detalhe.location.country}</Text>

        <Pressable
          onPress={() => setDetalhe(null)}
          style={styles.botao}
          accessibilityRole="button"
          accessibilityLabel="Voltar para lista"
        >
          <Text style={styles.botaoTexto}>← Voltar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Buscar cidade..."
        style={styles.input}
        value={busca}
        onChangeText={buscar}
        accessibilityLabel="Campo de busca por cidade"
      />

      {carregando ? (
        <ActivityIndicator size="large" color="blue" />
      ) : erro ? (
        <Text style={styles.erro}>{erro}</Text>
      ) : (
        <FlatList
          data={filtradas}
          keyExtractor={(item) => item.location.name}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => abrirDetalhes(item.location.name)}
              accessibilityRole="button"
              accessibilityLabel={`Ver detalhes do clima em ${item.location.name}`}
            >
              <Text style={styles.nome}>{item.location.name}</Text>
              <Text>{item.current.temp_c}°C - {item.current.condition.text}</Text>
            </TouchableOpacity>
          )}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50, backgroundColor: '#fff' },
  input: {
    borderWidth: 1, borderColor: '#aaa', borderRadius: 8,
    padding: 10, marginBottom: 10, fontSize: 16
  },
  card: {
    backgroundColor: '#eef6ff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2
  },
  nome: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  texto: { fontSize: 18, marginBottom: 5 },
  botao: {
    marginTop: 30,
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center'
  },
  erro: { color: 'red', textAlign: 'center' }
});
