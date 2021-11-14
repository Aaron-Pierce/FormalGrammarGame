# Formal Grammar Game

I thought the ideas behind grammars seemed very gamelike,
where you have slots and you can transmute those slots into other slots or
into objects to fill those slots. 

Trying to find a way to derive a certain string from a grammar (called parsing)
is a difficult problem in terms of time complexity, which is pure gold.
Computationally difficult problems make for great games.

At base, this is probably enough for a reasonably good game. You are given
some string to create and some production rules and off you go. You could even
implement an undo/redo tree and make it nice and convenient to create.

The UI becomes an important concern. How do you select symbols to apply production
rules to? It will depend on your grammar. If you have a context-free grammar
as opposed to something like a phase structure grammar, your life will be a lot easier.
Simiarly, if you force all derivations to be leftmost you can simplify the UI even further
by just having to push buttons, because at each step you are deciding for the leftmost
nonterminal. There could be different game modes and things like that, which could be fun.
Generating a particular string may be easier or harder for a human if you are restricted
to a leftmost or rightmost derivation versus being able to derive things at will.

Another (maybe more helpful) game is to generate a grammar that matches a certain language
and it can test it out, but that's not only too close to a homeowkr problem to be fun,
it also runs into the time complexity problem of verifying that your grammar is correct.
That would be a fun problem to solve, the naiive solution is to brute force derivations
and see if any match but that sucks a lot. You also need the grammar to be of a certain form
to ensure the derivations can't loop and run into other cases like that. Overall it seems
harder, and harder to design puzzles for. It's way cooler to hand someone a grammar
and have them derive a particular string.

It's hard to look at a grammar and know what it will do, so this could be good practice.

I'll try that gamemode first. You are given a target string and a predefined grammar and
want to generate that string. What does the UI look like? Do you drag production rules
onto nonterminals? 

    To answer this question, we should probably decide that grammars are context free.
    All production rules happen to a single nonterminal, without caring about their neighbors.
    No other restrictions seem necessary yet. For example, left/rightmostness is something
    that can be added on top of this, but I think the basic version should let you perform
    productions at will.

    What does this UI look like and how do I implement it?
    If you are dragging and dropping things onto each other, using raw HTML and JS seems
    ill fitting. If you can implement it with some series of button clicks it's not so bad.

    Like maybe you click a production rule and then click a nonterminal to apply it to,
    and it can highlight valid nonterminals. What if you have a lot of production rules?
    I will be designing these puzzles by hand, probably, so I can kind of solve that problem
    in the puzzle design. I do have one idea, though. Your productions are of the form
    N -> w | x | y | z, where N is a nonterminal and w,x,y,z are all strings of some kind.
    So your production rules would be grouped by their nonterminal in a button. Once you
    click the N button, it opens up the option to choose which specific production you want to apply
    So it's a 3 click flow. Click the nonterminal from the production list, select which replacement rule
    to use, and then click the matching nonterminal in the string to apply it to.
    I could also just group these by column (or row on mobile), so we could try that first.

    This seems very cool and I am excited about it.

What are the parts required?

You need a way to define a grammar.
    It's made up of:
    - A list of nonterminals
    - A list of symbols in the alphabet (smaller is better)
    - A list of production rules
    - A start nonterminal. We can just always use S

Also, what's the theme? It feels very spellcast-y but we can start abstract and make it look
like grammar problems and see what happens from there 

You need a way to click specific symbols in the input string, maybe each nonterminal
gets wrapped in its own span with conditional hover styling and the like.
    Is this a good use case for a framework like react? Code re-use would be very nice
    but I don't want something too heavyweight. Maybe vue is a good pick for this one.