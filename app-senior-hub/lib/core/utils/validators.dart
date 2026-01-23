class Validators {
  static String? validateEmail(String? value) {
    if (value == null || value.isEmpty) {
      return 'Por favor, insira um email';
    }
    final emailRegex = RegExp(r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$');
    if (!emailRegex.hasMatch(value)) {
      return 'Email inválido';
    }
    return null;
  }

  static String? validateRequired(String? value, [String field = 'Campo']) {
    if (value == null || value.isEmpty) {
      return '$field é obrigatório';
    }
    return null;
  }

  static String? validateMinLength(String? value, int minLength) {
    if (value == null || value.length < minLength) {
      return 'Mínimo de $minLength caracteres';
    }
    return null;
  }
}
