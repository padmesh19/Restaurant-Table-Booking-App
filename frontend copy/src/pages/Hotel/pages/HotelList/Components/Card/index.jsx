import { CardContainer } from "./elements"
import TrashIcon from "../../../../../../assets/icons/trash.svg"
import EditIcon from "../../../../../../assets/icons/pencil.svg"
export const Card = ({
  className,
  menuName,
  itemType,
  EditOnClick,
  DeleteOnClick,
}) => (
  <CardContainer className={className}>
    <div className="card__body">
      <h2 className="card__title">{menuName}</h2>
      <div className="badge mr-3">
        <span>{itemType}</span>
      </div>
    </div>
    <div className="d-flex align-items-center gap-1">
      <button className="card_btn_edit" type="button" onClick={EditOnClick}>
        <img src={EditIcon} alt="edit-icon" />
      </button>
      <button
        className="card_btn_delete ml-2"
        type="button"
        onClick={DeleteOnClick}
      >
        <img src={TrashIcon} alt="edit-icon" />
      </button>
    </div>
  </CardContainer>
);
