import React from 'react';
import style from './support.module.scss'; // Import styles

const SupportPage: React.FC = () => {
  return (
    <main className={style.main}>
      <header className={style.header}>
        <h1>Поддержите нас</h1>
      </header>
      <section className={style.section}>
        <p>
          Наш проект является независимой инициативой и не получает финансовой
          поддержки от государственных структур или коммерческих организаций. Мы
          создали его с целью повышения осведомленности общества и
          документирования.
        </p>
        <p>
          Поскольку наш проект не коммерческий, все расходы на его содержание,
          поддержку и развитие мы покрываем самостоятельно.
        </p>
        <p>
          Мы будем признательны за любую посильную финансовую поддержку, которая
          поможет нам продолжить нашу работу. Ваша помощь позволит нам развивать
          проект, добавлять новые материалы и обеспечивать безопасность и
          стабильность платформы.
        </p>
        <p>
          Если вы хотите помочь нашему проекту, вы можете сделать перевод на
          указанный ниже счёт. Мы благодарны каждому, кто решит поддержать нас в
          этом начинании.
        </p>
        <p>
          Номер счета для переводов T-банк: <strong>5536 9138 6554 5368</strong>
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <h3>BTC кошелек:</h3>
          <p style={{ wordWrap: 'break-word' }}>
            bc1qphtkk4jhxrar09ujntmzlw66vjhe3pu4vl3fpw
          </p>
          <img
            id="bitcoin-qr"
            src="https://qr.crypt.bot/?url=bc1qphtkk4jhxrar09ujntmzlw66vjhe3pu4vl3fpw"
            alt="QR Code"
            style={{ maxWidth: '100px' }}
          />
        </div>
        <p>
          Если у вас есть вопросы или предложения, пишите нам по адресу:
          <strong> gapasilka6@mail.ru</strong>
        </p>
      </section>
    </main>
  );
};

export default SupportPage;
