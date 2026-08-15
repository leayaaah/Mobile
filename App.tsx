import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type Note = {
  id: string;
  text: string;
};

export default function App() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState('');
  const [notes, setNotes] = useState<Note[]>([]);

  const addNote = () => {
    const trimmed = input.trim();
    if (!trimmed) {
      return;
    }

    setNotes((current) => [
      ...current,
      { id: `${Date.now()}-${current.length}`, text: trimmed },
    ]);
    setInput('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Expo React Native TypeScript Demo</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Counter</Text>
        <Text style={styles.counterValue}>{count}</Text>
        <View style={styles.buttonRow}>
          <Pressable style={styles.button} onPress={() => setCount((value) => value - 1)}>
            <Text style={styles.buttonText}>-1</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => setCount(0)}>
            <Text style={styles.buttonText}>Reset</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => setCount((value) => value + 1)}>
            <Text style={styles.buttonText}>+1</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Notes</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Nhập ghi chú"
            value={input}
            onChangeText={setInput}
          />
          <Pressable style={styles.button} onPress={addNote}>
            <Text style={styles.buttonText}>Add</Text>
          </Pressable>
        </View>

        <FlatList
          data={notes}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={<Text style={styles.empty}>Chưa có ghi chú nào.</Text>}
          renderItem={({ item }) => (
            <View style={styles.noteItem}>
              <Text style={styles.noteText}>{item.text}</Text>
              <Pressable onPress={() => setNotes((current) => current.filter((note) => note.id !== item.id))}>
                <Text style={styles.removeText}>Xóa</Text>
              </Pressable>
            </View>
          )}
        />
      </View>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  title: {
    marginTop: 12,
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
  },
  section: {
    marginTop: 24,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  counterValue: {
    fontSize: 36,
    fontWeight: '700',
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#2f7cff',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  inputRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d5d5d5',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  empty: {
    color: '#666',
    fontStyle: 'italic',
  },
  noteItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f5f7ff',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 8,
  },
  noteText: {
    flex: 1,
    marginRight: 8,
  },
  removeText: {
    color: '#d62828',
    fontWeight: '600',
  },
});
