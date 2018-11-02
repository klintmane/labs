extern crate clap;

mod cli;
mod interp;
mod lexer;
mod source;
mod token;

fn main() {
    let args = cli::new();
    let src = source::from(args.path);
    let mut lex = lexer::Lexer::new(src);

    match lex.scan_tokens() {
        Ok(tokens) => println!("Total tokens: {:?}", &tokens),
        Err(_) => println!("Something went wrong"),
    }
}
