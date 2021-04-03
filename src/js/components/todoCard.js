import { setAttributes } from "../utils/utils";
import { format } from "date-fns";
import { parseISO } from "date-fns/esm";

export default function (todo) {
  function _makeCardWrapper() {
    const el = document.createElement("div");

    el.classList.add("card", "border-primary", "overflow-hidden", "shadow-sm", "mb-3");
    return el;
  }

  function _makeCardHeader() {
    const el = document.createElement("div");

    el.classList.add("card-header", "border-0", "p-0");
    return el;
  }

  function _makeCollapseToggler() {
    const el = document.createElement("button");
    el.classList.add(
      "btn",
      "alert-primary",
      "d-flex",
      "align-items-center",
      "justify-content-between",
      "w-100",
      "text-start",
      "fw-light",
      "rounded-1"
    );
    setAttributes(el, {
      "data-bs-toggle": "collapse",
      "data-bs-target": "#" + todo.id,
    });
    el.innerText = todo.title;
    return el;
  }

  function _makeDateBadge() {
    const el = document.createElement("div");

    el.classList.add("badge", "bg-secondary");
    el.innerText = format(new Date(todo.dueDate), "dd-mm-yyyy");
    return el;
  }

  function _makeCollapsible() {
    const el = document.createElement("div");

    el.classList.add("collapse");
    el.id = todo.id;
    return el;
  }

  function _makeCardBody() {
    const el = document.createElement("div");

    el.classList.add("card-body", "rounded-bottom");
    return el;
  }

  function _makeTodoDesc() {
    const el = document.createElement("p");

    el.classList.add("card-text", "mb-0", "text-primary");
    el.innerText = todo.description;
    return el;
  }

  function _makeTodoNotes() {
    const el = document.createElement("div");

    el.classList.add(
      "alert",
      "alert-secondary",
      "border-0",
      "py-1",
      "fw-light",
      "mb-0",
      "fs-sm",
      "fst-italic"
    );
    el.innerText = todo.notes;
    return el;
  }

  function makeTodoCard() {
    const card = _makeCardWrapper();
    const cardHeader = _makeCardHeader();
    const toggler = _makeCollapseToggler();
    const badge = _makeDateBadge();
    const collapsible = _makeCollapsible();
    const cardBody = _makeCardBody();

    toggler.appendChild(badge);
    cardHeader.appendChild(toggler);
    cardBody.appendChild(_makeTodoDesc());
    cardBody.appendChild(_makeTodoNotes());
    collapsible.appendChild(cardBody);
    card.appendChild(cardHeader);
    card.appendChild(collapsible);

    return card;
  }

  return makeTodoCard();
}
