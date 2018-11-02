use std::collections::HashMap;

use token::{Literal, Token, TokenType};

pub struct Lexer {
  source: Vec<char>,
  tokens: Vec<Token>,

  start: usize,
  current: usize,
  line: usize,
}

impl Lexer {
  pub fn new(src: String) -> Lexer {
    Lexer {
      source: src.chars().collect(),
      tokens: vec![],

      start: 0,
      current: 0,
      line: 1,
    }
  }

  fn length(&self) -> usize {
    self.source.len()
  }

  fn push_token(&mut self, token_type: TokenType) {
    self.push_literal_token(token_type, None);
  }

  fn push_ltoken(&mut self, token_type: TokenType, literal: Literal) {
    self.push_literal_token(token_type, Some(literal));
  }

  fn push_literal_token(&mut self, token_type: TokenType, literal: Option<Literal>) {
    let lexeme = self.source[self.start..self.current].into_iter().collect();
    let token = Token::create(token_type, self.line, Some(lexeme), literal);

    self.tokens.push(token);
  }

  // Returns the current character while advancing the cursor to the next one
  fn pop_char(&mut self) -> char {
    self.current += 1;
    self.source[self.current - 1]
  }

  // Return the current char
  fn current_char(&self) -> char {
    if self.done() {
      return '\0';
    }
    self.source[self.current]
  }

  // Returns the next char
  fn next_char(&self) -> char {
    if self.current + 1 >= self.length() {
      return '\0';
    }
    self.source[self.current + 1]
  }

  fn increment_line(&mut self) {
    self.line += 1;
  }

  // Check whether the next character is what we expect
  fn is_next_char(&mut self, expected: char) -> bool {
    if self.done() {
      false
    } else if self.source[self.current] != expected {
      false
    } else {
      self.current += 1;
      true
    }
  }

  // Checks if the end has been reached
  fn done(&self) -> bool {
    self.current >= self.length()
  }

  fn string(&mut self) -> Result<(), String> {
    while self.current_char() != '"' && !self.done() {
      if self.current_char() == '\n' {
        self.increment_line();
      }
      self.pop_char();
    }

    if self.done() {
      return Err("Unterminated string".to_string());
    }

    self.pop_char();

    let value = self.source[(self.start + 1)..(self.current - 1)]
      .into_iter()
      .collect();

    self.push_ltoken(TokenType::Str, Literal::Str(value));

    Ok(())
  }

  fn number(&mut self) {
    while self.current_char().is_digit(10) {
      self.pop_char();
    }

    if self.current_char() == '.' {
      if self.next_char().is_digit(10) {
        self.pop_char();
        while self.current_char().is_digit(10) {
          self.pop_char();
        }
      }
    }

    let value: f64 = self.source[self.start..self.current]
      .into_iter()
      .collect::<String>()
      .parse()
      .unwrap();

    self.push_ltoken(TokenType::Numb, Literal::Float(value));
  }

  fn identifier(&mut self) {
    // Pop characters while char is alphanumeric or undescore
    while self.current_char().is_alphanumeric() || self.current_char() == '_' {
      self.pop_char();
    }

    // Once we have reached the end of the identifier
    let id = self.source[self.start..self.current]
      .into_iter()
      .collect::<String>();

    // Match the identifier, if a language keyword push that, otherwise this is an identifier
    match Lexer::match_keyword(&id) {
      Some(keyword_token) => self.push_token(keyword_token),
      None => self.push_token(TokenType::Iden),
    }
  }

  fn match_keyword(keyword: &str) -> Option<TokenType> {
    match keyword {
      "and" => Some(TokenType::And),
      "or" => Some(TokenType::Or),

      "true" => Some(TokenType::True),
      "false" => Some(TokenType::False),

      "if" => Some(TokenType::If),
      "else" => Some(TokenType::Else),
      "for" => Some(TokenType::For),
      "while" => Some(TokenType::While),

      "var" => Some(TokenType::Var),
      "fun" => Some(TokenType::Fun),

      "class" => Some(TokenType::Class),
      "this" => Some(TokenType::This),
      "super" => Some(TokenType::Super),

      "nil" => Some(TokenType::Nil),
      "print" => Some(TokenType::Print),
      "return" => Some(TokenType::Return),

      _ => None,
    }
  }

  fn scan_token(&mut self) -> Result<(), String> {
    let c = self.pop_char();

    match c {
      '(' => self.push_token(TokenType::ParenL),
      ')' => self.push_token(TokenType::ParenR),
      '{' => self.push_token(TokenType::BraceL),
      '}' => self.push_token(TokenType::BraceR),

      ',' => self.push_token(TokenType::Comma),
      '.' => self.push_token(TokenType::Dot),
      ';' => self.push_token(TokenType::Semicolon),

      '-' => self.push_token(TokenType::Sub),
      '+' => self.push_token(TokenType::Add),
      '*' => self.push_token(TokenType::Mult),

      // Possibly two character long tokens (depending on the next char)
      '!' | '=' | '<' | '>' => {
        if self.is_next_char('=') {
          match c {
            '!' => self.push_token(TokenType::NotEq),
            '=' => self.push_token(TokenType::EqEq),
            '<' => self.push_token(TokenType::LtEq),
            '>' => self.push_token(TokenType::GtEq),
            _ => panic!(),
          }
        } else {
          match c {
            '!' => self.push_token(TokenType::Not),
            '=' => self.push_token(TokenType::Eq),
            '<' => self.push_token(TokenType::Lt),
            '>' => self.push_token(TokenType::Gt),
            _ => panic!(),
          }
        }
      }

      // Comment or Division (depending on the next char)
      '/' => {
        if self.is_next_char('/') {
          // Pop characters until the next line or the end of the file
          while self.current_char() != '\n' && !self.done() {
            self.pop_char();
          }
        } else {
          self.push_token(TokenType::Div);
        }
      }

      // Characters that need to be ignored
      ' ' | '\r' | '\t' => {}

      // Newline character
      '\n' => {
        self.increment_line();
      }

      '"' => self.string()?,

      '0'...'9' => self.number(),

      'a'...'z' | 'A'...'Z' | '_' => self.identifier(),

      _ => {
        return Err("Unexpected character".to_string());
      }
    }
    Ok(())
  }

  pub fn scan_tokens(&mut self) -> Result<Vec<Token>, String> {
    while !self.done() {
      self.start = self.current;
      self.scan_token()?;
    }
    self
      .tokens
      .push(Token::create(TokenType::Eof, self.line, None, None));
    Ok(self.tokens.clone())
  }
}
