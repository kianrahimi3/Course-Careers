package main

import (
	"fmt"
)

type Node[T any] struct {
	next  *Node[T]
	prev  *Node[T]
	value T
}
type LinkedList[T any] struct {
	head   *Node[T]
	length uint
}

func (ll *LinkedList[T]) index(idx uint) (T, bool) {
	// return value and "ok", indicating if index is valid
	var value T
	if idx >= ll.length {
		return value, false
	} else {
		curr := ll.head

		for i := uint(0); i < uint(ll.length); i++ {
			if i == idx {
				value = curr.value
				break
			}
			curr = curr.next
		}
		return value, true
	}
}

func (ll *LinkedList[T]) append(value T) {
	if ll.length == 0 {
		ll.head = &Node[T]{value: value}
		ll.head.prev = ll.head
		ll.head.next = ll.head
	} else {

		tail := ll.head.prev
		node := &Node[T]{next: ll.head, prev: tail, value: value}

		tail.next = node
		ll.head.prev = node
	}

	ll.length += 1
}

func (ll *LinkedList[T]) pop() T {
	if ll.length == 0 {
		var null T
		value := ll.head.value
		ll.head.value = null
		return value
	}

	tail := ll.head.prev
	ll.head.prev = tail.prev
	tail.prev.next = ll.head

	ll.length -= 1
	return tail.value
}

func (ll *LinkedList[T]) printList() {
	list := []T{}
	curr := ll.head

	var idx uint = 0
	for idx < ll.length {
		list = append(list, curr.value)
		curr = curr.next
		idx += 1
	}

	fmt.Println(list)
}

func main() {
	ll := LinkedList[int]{}
	ll.append(1)
	ll.append(2)
	ll.append(3)

	ll.printList()
	fmt.Println(ll.index(2))

	fmt.Println(ll.pop())
	ll.printList()
}
