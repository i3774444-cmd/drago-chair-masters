import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeading } from "@/components/PageShell";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Политика конфиденциальности | DRAGO" },
      { name: "description", content: "Политика обработки персональных данных DRAGO — ремонт и перетяжка кресел в Минске." },
      { name: "robots", content: "index,follow" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <PageShell>
      <PageHeading
        kicker="Документ"
        title="Политика конфиденциальности"
        subtitle="Как DRAGO обрабатывает и защищает ваши персональные данные."
      />

      <article className="mx-auto max-w-3xl px-4 lg:px-8 py-12 lg:py-16 prose prose-invert space-y-6 text-foreground">
        <p className="text-muted-foreground text-sm font-mono">Редакция от 5&nbsp;мая 2026&nbsp;г.</p>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold">1. Оператор данных</h2>
          <p className="text-muted-foreground">
            ИП Драгун А.&nbsp;В. (далее — «DRAGO»), УНП&nbsp;191234567,
            г.&nbsp;Минск, ул.&nbsp;Притыцкого,&nbsp;62, цех&nbsp;4.
            Контакт: <a className="text-accent hover:underline" href="mailto:hello@drago.by">hello@drago.by</a>,
            <a className="text-accent hover:underline ml-1" href="tel:+375291234567">+375&nbsp;29&nbsp;123-45-67</a>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold">2. Какие данные мы собираем</h2>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
            <li>Имя и контактный телефон — для связи по заявке.</li>
            <li>Название и УНН организации — при заказе от юр.&nbsp;лица.</li>
            <li>Комментарий и фото кресла — для предварительной оценки работ.</li>
            <li>Технические данные браузера (cookie, IP, страницы) — для аналитики и безопасности.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold">3. Цели обработки</h2>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
            <li>Обработка заявки и согласование работ.</li>
            <li>Заключение и исполнение договора.</li>
            <li>Информирование о статусе ремонта.</li>
            <li>Улучшение сайта и качества сервиса.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold">4. Правовое основание</h2>
          <p className="text-muted-foreground">
            Закон Республики Беларусь от 7&nbsp;мая 2021&nbsp;г. №&nbsp;99-З
            «О защите персональных данных». Согласие пользователь даёт, отправляя форму на сайте.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold">5. Срок хранения</h2>
          <p className="text-muted-foreground">
            Данные хранятся не дольше, чем необходимо для целей обработки,
            но не более 3&nbsp;лет с момента последнего обращения.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold">6. Передача третьим лицам</h2>
          <p className="text-muted-foreground">
            Мы не продаём и не передаём данные третьим лицам, кроме случаев,
            когда это требуется законом или необходимо для исполнения договора
            (курьерская доставка, бухгалтерское сопровождение).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold">7. Ваши права</h2>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
            <li>Получить информацию об обработке своих данных.</li>
            <li>Изменить или удалить данные.</li>
            <li>Отозвать согласие в любой момент.</li>
          </ul>
          <p className="text-muted-foreground">
            Запрос направляйте на <a className="text-accent hover:underline" href="mailto:hello@drago.by">hello@drago.by</a>.
            Срок ответа — до&nbsp;15&nbsp;рабочих дней.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold">8. Cookie</h2>
          <p className="text-muted-foreground">
            Сайт использует функциональные cookie для сохранения темы оформления
            и аналитические — для подсчёта посещений. Отключить cookie можно в настройках браузера.
          </p>
        </section>
      </article>
    </PageShell>
  );
}
