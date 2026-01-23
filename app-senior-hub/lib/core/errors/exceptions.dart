class ServerException implements Exception {
  final String message;
  ServerException([this.message = 'Erro no servidor']);
}

class CacheException implements Exception {
  final String message;
  CacheException([this.message = 'Erro no cache']);
}

class NetworkException implements Exception {
  final String message;
  NetworkException([this.message = 'Sem conexão']);
}
