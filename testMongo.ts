import { MongoClient } from 'mongodb';

// URI de conexão com o MongoDB
const uri = 'mongodb+srv://user-plann_be:9fOelVV09FIHW6bU@cluster0.1nqof.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Altere conforme a sua configuração
const client = new MongoClient(uri);

// Função para testar a conexão
async function testConnection() {
  try {
    // Conectar ao servidor
    await client.connect();
    console.log('Conectado ao MongoDB com sucesso!');

    // Escolher o banco de dados (por exemplo, 'testdb')
    const db = client.db('test');

    const collectionsCursor = db.listCollections();
    const collections = await collectionsCursor.toArray();
    const collectionNames = collections.map(col => col.name);

    console.log('Coleções disponíveis:', collectionNames);
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
  } finally {
    // Fechar a conexão
    await client.close();
  }
}

// Executar a função de teste
testConnection();
