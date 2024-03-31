import { ChangeEvent, FormEvent, useState } from "react";
import css from "./Form.module.css";
import { useAppDistpatch, useAppSelector } from "../../hooks/hooks";
import { getContacts } from "../../store/selectors";
import { addContact } from "../../store/thunk";

const Form = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const contacts = useAppSelector(getContacts);
  const distpatch = useAppDistpatch();
  const handlerChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "number":
        setNumber(value);
        break;
      default:
        return;
    }
  };
  const handlerSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setName("");
    setNumber("");
    const result = contacts.find(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (!result) {
      const contact = {
        name,
        number,
      };
      distpatch(addContact(contact));
    } else {
      return alert(`${name} is already in contacts`);
    }
  };
  return (
    <div className="">
      <h1 className={css.title}>Phonebook</h1>
      <form className={css.form} onSubmit={handlerSubmit}>
        <div className={css.blockImputs}>
          <div className={css.divInput}>
            <label className={css.label} htmlFor="222">
              Name
            </label>
            <input
              className={css.input}
              type="text"
              name="name"
              id="222"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              value={name}
              onChange={handlerChange}
            />
          </div>
          <div className={css.divInput}>
            {" "}
            <label className={css.label} htmlFor="223">
              Number
            </label>
            <input
              className={css.input}
              id="223"
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              value={number}
              onChange={handlerChange}
            />
          </div>
        </div>

        <button className={css.buttonx} type="submit">
          Add contact
        </button>
      </form>
    </div>
  );
};
export default Form;
