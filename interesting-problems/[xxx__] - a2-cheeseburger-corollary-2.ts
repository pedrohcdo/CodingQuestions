
/**
	This problem shares some similarities with A1, with key differences in bold.
	Problem solving skills are applicable to many daily musings. For instance, you might ponder over shared birthdays, bird houses, mapmaking, or ordering an exact number of chicken nuggets. Naturally, another great question to ponder is: how many deckers of a cheeseburger you could build if you spent your entire salary on fast food!
	Specifically, you're interested in building a 
	
	K-decker cheeseburger, which alternates between buns, cheese, and patty starting and ending with a bun. Buying a single cheeseburger costs 
	
	A dollars and a double cheeseburger costs 
	
	B dollars. Each provides you with two buns, though a single provides one patty and one cheese, while a double provides two patties and two cheese.

	You'd like to know the biggest 
	
	K for which you can build a 
	
	K-decker cheeseburger by spending at most 
	
	C dollars.

	---
	https://www.facebook.com/codingcompetitions/hacker-cup/2023/practice-round/problems/A2
 */

// O(1) :)
function cheeseburguer2(a: number, b: number, c: number) {
	//
	return Math.max(
		0,
		Math.floor(c / a),
		Math.floor(c / b) * 2 - 1,
		1 + Math.floor((c - a) / b) * 2,
		2 + Math.floor((c - 2 * a) / b) * 2
	)
}

// O(LogN)
function cheeseburguer(a: number, b: number, c: number) {
	let l = 0
	let r = Math.floor(c / a)
	let max = -1

	while (r >= l) {
		let mid = Math.floor((l + r) / 2)

		// Look window
		let best: number | null = null
		let bestI = -2
		for (let i = -2; i <= 2; i++) {

			let cA = Math.max(0, Math.min(r, mid + i))
			let cB = Math.floor((c - a * cA) / b)
			let curr = Math.max(Math.min((cA + cB) * 2 - 1, cA + cB * 2), 0)

			if (best === null || best < curr) {
				best = curr
				bestI = i
			}
		}

		max = Math.max(max, best!)

		//
		if (bestI === 0) break
		else if (bestI < 0) r = mid - 1
		else l = mid + 1
	}

	//
	return max
}