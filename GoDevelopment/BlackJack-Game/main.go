package main

import (
	"bufio"
	"fmt"
	"math"
	"math/rand"
	"os"
	"strconv"
	"strings"
	"time"
)

type Card struct {
	value int
	suit  int // 0 - spades, 1 - hearts, 2 - diamonds, 3 - clubs
}

func (card Card) getString() string {
	var suit string
	var value string

	switch card.suit {
	case 0:
		suit = "♠"
	case 1:
		suit = "♥"
	case 2:
		suit = "♦"
	case 3:
		suit = "♣"
	}

	switch card.value {
	case 11:
		value = "J"
	case 12:
		value = "Q"
	case 13:
		value = "K"
	case 1:
		value = "A"
	default:
		value = fmt.Sprintf("%d", card.value)
	}

	return value + suit
}

type Deck struct {
	cards []Card
}

func (d *Deck) deal(num uint) []Card {
	cardsDealt := []Card{}

	for i := uint(0); i < num; i++ {
		card := d.cards[0]
		cardsDealt = append(cardsDealt, card)
		d.cards = d.cards[1:]
	}

	return cardsDealt
}

func (d *Deck) create() {
	// initialize value for each card and suit

	for i := 1; i <= 13; i++ {
		for j := 0; j < 4; j++ {
			card := Card{value: i, suit: j}
			d.cards = append(d.cards, card)
		}
	}
}

func (d *Deck) shuffle() {
	rand.Shuffle(len(d.cards), func(i, j int) { d.cards[i], d.cards[j] = d.cards[j], d.cards[i] })
}

type Game struct {
	deck        Deck
	playerCards []Card
	dealerCards []Card
}

func (game *Game) dealStartingCards() {
	game.deck.create()
	game.deck.shuffle()

	game.playerCards = game.deck.deal(2)
	game.dealerCards = game.deck.deal(2)

	fmt.Printf("Player has been dealt: ")
	displayCards(game.playerCards)
	fmt.Printf("\nDealer shows: %s\n", game.dealerCards[0].getString())
}

func (game *Game) play(bet float64) float64 {
	defer fmt.Printf("\n--------------------------\n\n")

	fmt.Printf("\n--------------------------\n\n")
	
	game.dealStartingCards()

	// check for 21
	playerHasBlackjack := isBlackjack(game.playerCards)
	dealerHasBlackjack := isBlackjack(game.dealerCards)

	if playerHasBlackjack && dealerHasBlackjack {
		fmt.Println("Both people have blackjack! It is a tie.")
		return 0
	} else if (playerHasBlackjack && !dealerHasBlackjack) {
		fmt.Println("Blackjack! You won!")
		return bet * 1.5
	} else if (dealerHasBlackjack) {
		fmt.Println("Dealer got 21!")
		return -bet
	}
	
	// continue playing
	// if lost, you lose "bet"
	if game.playerTurn() {
		return -bet
	}

	game.dealerTurn()


	// check if won or not

	dealerScore := getCardValues(game.dealerCards)
	playerScore := getCardValues(game.playerCards)

	if dealerScore > 21 && playerScore <= 21 {
		fmt.Println("You won! :)")
		return bet*2
	} else if dealerScore > playerScore{
		fmt.Println("You lost! :(")
		return -bet
	} else if dealerScore < playerScore {
		fmt.Println("You won! :)")
		return bet*2
	} else {
		fmt.Println("Push!")
		return 0.0
	}

}

func (game *Game) playerTurn() bool {
	for {
		fmt.Println("Would you like to Hit or Stay? (H/S)")
		choice := enterString()

		if choice == "H" {
			card := game.deck.deal(1)[0]
			game.playerCards = append(game.playerCards, card)
			
			fmt.Printf("You now have: ")
			displayCards(game.playerCards)

			score := getCardValues(game.playerCards)
			if score > 21 {
				fmt.Println("You busted!")
				return true
			} else if score == 21 {
				fmt.Println("BlackJack! :)")
				return false
			}

		} else if choice == "S" {
			return false
		}
	}
	return false
}

func (game *Game) dealerTurn() {
	for true {
		score := getCardValues(game.dealerCards)
		if score >= 17 {
			if score > 21 {
				fmt.Println("Dealer busted!")
			}
			return
		} else {
			time.Sleep(2*time.Second)
			card := game.deck.deal(1)[0]
			game.dealerCards = append(game.dealerCards, card)
			fmt.Println("Dealer hits and receives:", card.getString())
			fmt.Print("Dealer now has: ")
			displayCards(game.dealerCards)
			fmt.Println()
		}
	}
}

func enterString() string {
	reader := bufio.NewReader(os.Stdin)
	// ReadString will block until the delimiter is entered
	input, err := reader.ReadString('\n')
	if err != nil {
		fmt.Println("An error occurred while reading input. Please try again", err)
		return ""
	}

	// remove the delimiter from the string
	input = strings.TrimSuffix(input, "\n")
	input = strings.TrimSuffix(input, "\r")
	return input
}

func getCardValues(cards []Card) int {
	aces := 0
	value := 0

	for _, card := range cards {
		if card.value == 1 {
			aces++
		} else {
			value += int(math.Min(10, float64(card.value)))
		}
	}

	if aces == 0 {
		return value
	}

	if value < (11 + aces - 1) {
		return value + 11 + aces - 1
	} else {
		return value + aces
	}
}

func displayCards(cards []Card) {
	value := getCardValues(cards)
	displayStr := ""

	for i, card := range cards {
		displayStr += card.getString()
		if i < len(cards)-1 {
			displayStr += " "
		}
	}

	fmt.Printf("%v = %v\n", displayStr, value)
}

func isPlayerWinner(playerHand []Card, dealerHand []Card) int {
	playerValue := getCardValues(playerHand)
	dealerValue := getCardValues(dealerHand)

	if playerValue == dealerValue {
		return 0
	} else if playerValue > dealerValue || dealerValue > 21 {
		return 1
	} else {
		return -1
	}
}

func shouldDealerHit(dealerCards []Card) bool {
	value := getCardValues(dealerCards)
	return value <= 16
}

func isBlackjack(cards []Card) bool {
	value := getCardValues(cards)
	return value == 21 && len(cards) == 2
}

func main() {
	balance := float64(100)

	for balance > 0 {
		fmt.Printf("Your balance is: $%.2f\n", balance)
		fmt.Printf("Enter your bet (q to quit): ")
		bet, err := strconv.ParseFloat(enterString(), 64)
		if err != nil {
			break
		}
		if bet > balance || bet <= 0 {
			fmt.Println("Invalid bet.")
			continue
		}

		game := Game{}
		balance += game.play(bet)
	}

	fmt.Printf("You left with: $%2.f\n", balance)
}
