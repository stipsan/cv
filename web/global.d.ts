// Declaring this interface provides type safety for message keys
type Messages = typeof import('./messages/en.json') &
  ReturnType<
    typeof import('./pages/internal/somecard')['getStaticProps']
  >['props']['messages']['en']
declare interface IntlMessages extends Messages {}
