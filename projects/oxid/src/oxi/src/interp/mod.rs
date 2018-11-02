pub struct Program {
  pub source: String,
}

pub fn from(source: String) -> Program {
  println!("{}", &source);
  Program { source }
}
