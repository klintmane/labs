use clap::{App, Arg};

pub struct Arguments {
  pub path: String,
}

pub fn new() -> Arguments {
  let matches = App::new("Oxi")
    .version("0.1.0")
    .author("Klint Mane <klintmane@gmail.com>")
    .about("The Oxid language interpreter")
    .arg(
      Arg::with_name("PATH")
        .required(true)
        .takes_value(true)
        .index(1)
        .help("the path to the target source file"),
    ).get_matches();

  let path = matches.value_of("PATH").unwrap();

  Arguments {
    path: path.to_string(),
  }
}
