#[derive(Debug, Clone)]
pub enum TokenType {
  // Parenthesis & Brackets
  ParenL,
  ParenR,
  BraceL,
  BraceR,

  Comma,
  Dot,
  Semicolon,

  // Arithmetic
  Add,
  Sub,
  Mult,
  Div,

  // Comparison
  Not,
  NotEq,
  Eq,
  EqEq,
  Gt,
  GtEq,
  Lt,
  LtEq,

  // Literals
  Iden,
  Numb,
  Str,

  // Other
  And,
  Or,

  True,
  False,

  If,
  Else,
  For,
  While,

  Var,
  Fun,

  Class,
  This,
  Super,

  Nil,
  Print,
  Return,

  Eof,
}

#[derive(Debug, Clone)]
pub enum Literal {
  Str(String),
  Float(f64),
}

#[derive(Debug, Clone)]
pub struct Token {
  token_type: TokenType,
  line: usize,
  lexeme: Option<String>,   // Either a lexeme
  literal: Option<Literal>, // Or a literal
}

impl Token {
  pub fn create(
    token_type: TokenType,
    line: usize,
    lexeme: Option<String>,
    literal: Option<Literal>,
  ) -> Token {
    Token {
      token_type,
      line,
      lexeme,
      literal,
    }
  }
}
