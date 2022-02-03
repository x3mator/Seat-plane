import createElement from './createElement.js';

function createCockpit(titleText) {
  const cockpit = createElement('div', {
    className: 'cockpit',
  });
  const title = createElement('h1', {
    className: 'cockpit-title',
    textContent: titleText,
  });
  const button = createElement('button', {
    className: 'cockpit-confirm',
    type: 'submit',
    textContent: 'Подтвердить',
  });

  cockpit.append(title, button);

  return cockpit;
}

const createExit = () => {
  return createElement('div', {
    className: 'fuselage exit',
  });
};

const createBlockSeat = (n, count) => {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
  const fuselage = createElement('ol', {
    className: 'fuselage',
  });

  for (let i = n; i < count + n; i++) {
    const wrapperRow = createElement('li');
    const seats = createElement('ol', {
      className: 'seats',
    });

    const seatsRow = letters.map(letter => {
      const seat = createElement('li', {
        className: 'seat',
      });
      const wrapperCheck = createElement('label');
      const check = createElement('input', {
        className: 'seat',
        type: 'checkbox',
        value: `${i}${letter}`,
      });

      wrapperCheck.append(check);
      seat.append(wrapperCheck)
      return seat;
    });

    seats.append(...seatsRow);
    wrapperRow.append(seats);

    fuselage.append(wrapperRow);
  }

  return fuselage;
}

function createAirplane(title, scheme) {
  const choisesSeat = createElement('form', {
    className: 'choises-seat',
  });
  const plane = createElement('fieldset', {
    className: 'plane',
    name: 'plane',
  });
  const cockpit = createCockpit(title)

  let n = 1;

  const elements = scheme.map((type) => {
    if(type === 'exit') {
      return createExit();
    }

    if(typeof type === 'number') {
      const blockSeat = createBlockSeat(n, type);
      n = n + type;
      return blockSeat;
    }
  });

  plane.append(cockpit, ...elements);
  choisesSeat.append(plane);

  return choisesSeat;
}

function createTitle(data) {
  const seats = data.length;
  let text;
  if (seats === 1) text = '1 место'
    else if (5 > seats && seats > 1) text = `${seats} места`
      else text = ` ${seats} мест`;
  return `Выберите ${text}`;
}

const airplane = (main, data) => {
  console.log('места: ', data.length)
  const title = createTitle(data);
  const scheme = ['exit', 11, 'exit', 1, 'exit', 17, 'exit'];

  main.append(createAirplane(title, scheme));
};

export default airplane;