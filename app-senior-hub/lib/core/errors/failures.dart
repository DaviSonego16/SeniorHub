import 'package:equatable/equatable.dart';

abstract class Failure extends Equatable {
  final String message;

  const Failure(this.message);

  @override
  List<Object> get props => [message];
}

class ServerFailure extends Failure {
  const ServerFailure([String message = 'Erro no servidor']) : super(message);
}

class CacheFailure extends Failure {
  const CacheFailure([String message = 'Erro no cache']) : super(message);
}

class NetworkFailure extends Failure {
  const NetworkFailure([String message = 'Sem conexão com a internet'])
    : super(message);
}
