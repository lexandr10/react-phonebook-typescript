import css from "./ListContacts.module.css";
import { getContacts } from "../../store/selectors";
import { useAppDistpatch, useAppSelector } from "../../hooks/hooks";
import { deleteContact } from "../../store/thunk";

const ListContact = () => {
  const contacts = useAppSelector(getContacts);
  const distpatch = useAppDistpatch();

  return (
    <ul className={css.items}>
      {contacts.map(({ id, name, number }) => (
        <li className={css.list} key={id}>
          <div>
            <p className={css.text}>Name: {name}</p>
            <p className={css.text}>Number: {number}</p>
          </div>

          <button
            className={css.btn}
            id={id}
            onClick={() => distpatch(deleteContact(id))}
            type="button"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ListContact;
