import createElement from "./createElement.js";
import declOfNum from "./declOfNum.js";

const createCockpit = (titleText) => {
  const cockpit = createElement("div", {
    className: "cockpit",
  });
  const title = createElement("h1", {
    className: "cockpit-title",
    textContent: titleText,
  });
  const button = createElement("button", {
    className: "cockpit-confirm",
    type: "submit",
    textContent: "Подтвердить",
  });

  cockpit.append(title, button);

  return cockpit;
};

const createExit = () => {
  return createElement("div", {
    className: "fuselage exit",
  });
};

const createBlockSeat = (n, count) => {
  const letters = ["A", "B", "C", "D", "E", "F"];
  const fuselage = createElement("ol", {
    className: "fuselage",
  });

  for (let i = n; i < count + n; i++) {
    const wrapperRow = createElement("li");
    const seats = createElement("ol", {
      className: "seats",
    });

    const seatsRow = letters.map((letter) => {
      const seat = createElement("li", {
        className: "seat",
      });
      const wrapperCheck = createElement("label");
      const check = createElement("input", {
        className: "seat",
        type: "checkbox",
        value: `${i}${letter}`,
      });

      wrapperCheck.append(check);
      seat.append(wrapperCheck);
      return seat;
    });

    seats.append(...seatsRow);
    wrapperRow.append(seats);

    fuselage.append(wrapperRow);
  }

  return fuselage;
};

const createAirplane = (title, tourData) => {
  const scheme = tourData.scheme;

  const choisesSeat = createElement("form", {
    className: "choises-seat",
  });

  const plane = createElement("fieldset", {
    className: "plane",
    name: "plane",
  });

  const cockpit = createCockpit(title);

  let n = 1;

  const elements = scheme.map((type) => {
    if (type === "exit") {
      return createExit();
    }

    if (typeof type === "number") {
      const blockSeat = createBlockSeat(n, type);
      n += type;
      return blockSeat;
    }
  });

  plane.append(cockpit, ...elements);
  choisesSeat.append(plane);

  return choisesSeat;
};

const checkSeat = (form, data) => {
  console.log("1-> form", form);
  form.addEventListener("change", () => {
    const formData = new FormData(form);
    console.log("2-> formData", formData);
    console.log("3-> form", form);

    const checked = [...formData].map(item => {
      console.log("4-> item", item);
    })

  });
};


const airplane = (main, data, tourData) => {
  const title = `Выберите ${declOfNum(data.length, [
    "место",
    "места",
    "мест",
  ])}`;

  const choiseForm = createAirplane(title, tourData);

  checkSeat(choiseForm, data);

  main.append(choiseForm);
};

export default airplane;
