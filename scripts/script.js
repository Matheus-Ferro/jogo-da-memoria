const FRONT = "card_front";
const BACK = "card_back";
const CARD = "card";
const ICON = "icon";

start_game();
function start_game() {
  initialize_cards(game.create_cards());
}

function initialize_cards(cards) {
  let game_board = document.getElementById("game_board");
  game_board.innerHTML = "";

  game.cards.forEach((card) => {
    let card_element = document.createElement("div");
    card_element.id = card.id;
    card_element.classList.add(CARD);
    card_element.dataset.icon = card.icon;
    create_card_content(card, card_element);
    card_element.addEventListener("click", flip_card);
    game_board.appendChild(card_element);
  });
}

function create_card_content(card, card_element) {
  create_card_face(FRONT, card, card_element);
  create_card_face(BACK, card, card_element);
}

function create_card_face(face, card, element) {
  let card_element_face = document.createElement("div");
  card_element_face.classList.add(face);
  if (face === FRONT) {
    let icon_element = document.createElement("img");
    icon_element.classList.add(ICON);
    icon_element.src = "./images/" + card.icon + ".png";
    card_element_face.appendChild(icon_element);
  } else {
    card_element_face.innerHTML = "&lt/&gt";
  }
  element.appendChild(card_element_face);
}

function flip_card() {
  if (game.set_card(this.id)) {
    this.classList.add("flip");
    if (game.second_card) {
      if (game.check_match()) {
        game.clear_cards();
        if (game.check_game_over()) {
          let game_overlayer = document.getElementById("game_over");
          game_overlayer.style.display = "flex";
        }
      } else {
        setTimeout(() => {
          let first_card_view = document.getElementById(game.first_card.id);
          let second_card_view = document.getElementById(game.second_card.id);
          first_card_view.classList.remove("flip");
          second_card_view.classList.remove("flip");
          game.unflip_cards();
        }, 1000);
      }
    }
  }
}

function restart() {
  game.clear_cards();
  start_game();
  let game_overlayer = document.getElementById("game_over");
  game_overlayer.style.display = "none";
}
