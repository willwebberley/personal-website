---
title: "Command-line bookkeeping in Animal Crossing"
---

I recently stumbled across [an article](https://www.csun.io/2020/05/17/gnucash-finance.html) on Hacker News discussing the pros of basic personal accounting using [GnuCash](https://www.gnucash.org/) - a free and open-source desktop accounting program. The article was interesting as the data geek in me resonated with the notion of being able to query the information in useful ways, particularly after having used the system for enough time to accumulate enough financial data.

The [comments on the article's post](https://news.ycombinator.com/item?id=23237445) also mentioned another tool, [Ledger](https://www.ledger-cli.org/). Whilst GnuCash allows users to input transactional and account information as well as reports, Ledger's focus is only on the reports - a key feature of this CLI tool is that the actual bookkeeping is made directly (or through other tools) into a text file, which Ledger only reads from and never otherwise touches. Both programs work on the principle of [double-entry bookkeeping](https://en.wikipedia.org/wiki/Double-entry_bookkeeping), but some of the key positives of Ledger are its speed ([even when working with several decades' worth of financial data](https://www.ledger-cli.org/3.0/doc/ledger3.html#Archiving-Previous-Years)) and its innate ability to be combined with other useful UNIX tools - both for data input and, if necessary (Ledger's own reporting outputs are very powerful), output.

The fact that it relies on only a single human-manageable text file, which can contain the data for any number of accounts, and which can easily be version-controlled, is also a bonus in my eyes. The author of [Beancount](http://furius.ca/beancount/) - a similar program worth a look at - also wrote a good article about the benefits of [command-line accounting](https://docs.google.com/document/d/1e4Vz3wZB_8-ZcAwIFde8X5CjzKshE4-OXtVVHm4RQ8s).

I do not come from an accounting or bookkeeping background, but I was keen to start trying it out for myself, and wanted to make sure that I could get the grips of the basics before diving in too far and making too many mistakes that I'd have to go back and change later. I currently use [Xero](https://www.xero.com/uk/) for some business work, which happily handles (nearly) everything for me - invoicing, payments, automatic bank feeds and reconciliations, and more. It sometimes feels a bit slow and clunky, though, and its general ease of use does teach much about what actually goes on behind the scenes. Ledger seemed like a great alternative to use for personal finance - a powerful tool for viewing key information at a glance, combined with a familiar and standard method to "input" data. It also gives me the feel that I am more intimate with my accounts and also a richer understanding of my financial model.

Moving forwards from my initial experiments, I had three main aims:

- Learn the basics of bookkeeping (specifically with Ledger in mind);
- Learn how to run reports on "the books" using Ledger (e.g. profit & loss, and balance sheets);
- Learn how to actually apply this to something tangible (real life assets).

This post represents some of my learnings and attempts to apply them to a game that features a number of usefully illustrative financial transaction examples, as we'll see later.

To reiterate - I am not a bookkeeper, so my explanations are simply the way I describe the key concepts to myself. I acknowledge that my descriptions may not be 100% technically accurate from an accounting perspective, but I hope they will provide a decent understanding to others also starting out. This is still a learning exercise for me, so if anyone has any tips or points for improvement it'd be great to hear from you.

The rest of this post assumes that Ledger is installed. There are [instructions for this on GitHub](https://github.com/ledger/ledger).

## Command-line accounting & bookkeeping basics

I'm not going to go into too much detail here, as there is lots of information on Wikipedia about [bookkeeping](https://en.wikipedia.org/wiki/Bookkeeping), [double-entry bookkeeping](https://en.wikipedia.org/wiki/Double-entry_bookkeeping) and [debits and credits](https://en.wikipedia.org/wiki/Debits_and_credits). For me (probably due to my background) the best introduction was actually [Ledger's own documentation](https://www.ledger-cli.org/3.0/doc/ledger3.html#Fat_002dfree-Accounting), which I definitely recommend reading.

Essentially, in someone's double-entry world, the core concept is that money (or whatever assets/currencies/commodities you want to journal, but I'll talk about money here and, later, bells) - like matter and energy - can't be created or destroyed. In every transaction money must move from one place (account) to another such that the balance of the transaction equals zero, and therefore the balance of all transactions and accounts (books) is also zero ("balancing the books"). To put it another way, each transaction involves debiting one or more accounts and crediting one or more *other* accounts, such that the total amount of the credits equals the total amount of the debits. When adding a transaction to a ledger a bookkeeper signifies this by indicating the account(s) that have been debited and the account(s) that have been credited in the transaction.

In Ledger we do exactly the same by writing the transaction in the plain text file for our ledger:

```jsx
2020/05/21  Payee or description
  Account1  £50
  Account2  £-50
```

In this example, we show that money has been taken from (credited) Account2 and given to (debited) Account1. Note that in bookkeeping a "debit" is when an account receives a benefit and a "credit" is when an account gives a benefit. This is often the opposite to how people understand debit and credit, and there is a good explanation about this [on Wikipedia](https://en.wikipedia.org/wiki/Debits_and_credits#Aspects_of_transactions).

Note that the balance of the transaction is 0 (there is a credit of £50 and a debit of £50).

In bookkeeping, accounts don't have to (and usually don't) refer to just "bank accounts". Instead, accounts can be thought of as "categories" or "buckets" of money, of which there are four main types (e.g. for a person):

- Asset (what the person actually owns, such as cash, bank accounts and property)
- Liability (what the person owes to other people/entities)
- Income (where money comes to the person from)
- Expenses (where money going from the person goes)

There are also "equity" accounts, which indicates the person's net worth. I won't talk much about these types of accounts, but when first using Ledger yourself this type of account is what you'll use to represent your current "net worth" being transferred into your accounted-for assets and liabilities.

Note also that in Ledger we deal with positive and negative numbers to represent debit and credit respectively. Often bookkeepers don't use signs to indicate debit/credit and instead rely on the understanding that debit and credit mean different things for different types of accounts. For example, that a debit to an asset account is an increase, whereas a debit to a liability account is a decrease. This can be confusing so I won't go further into this!

In Ledger, we can indicate the account category and name to make the ledger more useful for reporting. E.g. to make the previous transaction better:

```jsx
2020/05/21  Tesco
  Expenses:Groceries   £50
  Assets:Bank Account
```

We can leave one value line blank in each transaction and Ledger will automatically balance it when running reports - in this scenario by marking a negative ("credit") £50 in the final line. This transaction shows account changes in two categories - an expense account and an asset account. When we went to Tesco we used our bank card to buy groceries, which debited our Expenses:Groceries account £50 and credited our Assets:Bank Account account the same amount. The expenses account does not refer to anything we "own"; moreover a debit in an expense represents a loss.

On the Tesco side, they may have something along these lines:

```jsx
2020/05/21  Customer123
  Assets:Bank Account     £50
  Income:Sales:Groceries  £-50
```

Tesco might associate my card with a unique customer number (`Customer123`) and mark the transaction as a credit in their income account and a debit in their bank account - essentially the opposite of my own record. Note that in this example Tesco (a more complex entity than myself) have categorised their income account further by indicating an additional level of precision, allowing them to run reports separately on all income, income from sales, and income specifically from groceries sales.

## Why Animal Crossing?

I (like many others around the world) have recently become engrossed in [Animal Crossing: New Horizons](https://en.wikipedia.org/wiki/Animal_Crossing:_New_Horizons) - a video game for the Nintendo Switch. The primary concept of the game is that your character, with the help of [travel company Nook Inc](https://animalcrossing.fandom.com/wiki/Nook_Inc), moves to a deserted island, along with a couple of other characters (at first), in order to build a new home and life.

![](/media/blog/acnh1.png)

When you first arrive at your new island, [Tom Nook](https://animalcrossing.fandom.com/wiki/Tom_Nook) (owner of Nook Inc) introduces you to the other islanders who have also come along, and to Timmy and Tommy (Tom Nook's apprentices). Tom, Timmy, Tommy (and other characters who later join) stay with you on your island to help you and your fellow islanders out on your new adventure.

Throughout the game the player is involved in a number of different types of financial transaction and must take out loans, make sales and purchases in order to progress. As I played, it occurred that this would be a great way to learn and explain basic bookkeeping with Ledger.

In the game the player works with a number of different asset types. The main currency (money) is `Bells` but there is also a loyalty program called `Nook Miles` which allows the player to gain points (like air miles or a points card for a store). Luckily Ledger can handle different currencies and commodities with no problem - and will even make conversions where it can too - so we can deal with all of our Animal Crossing assets in a single ledger.

The rest of this post walks through some of the early stages of the game, using it to illustrate basic bookkeeping with Ledger.

## Starting off the ledger

After landing, Tom Nook reveals your accomodation - a tent - and that you have inadvertently already got yourself into debt (from his perspective!). He tells you that the cost of your travel and moving has cost you some Nook Miles loyalty points, which you'll need to pay back in order to move to the next stages of the game. He does give you the option to pay nearly ten times the amount in Bells instead, but it's quicker to get the Miles.

![](/media/blog/acnh2.png)

We now have a financial position (despite it being "negative"). This means that we can add it to our ledger so that we have a clear record of the transaction and can begin to account for all of our finances. Even though you haven't physically given or received anything yet, you now have a new liability (loan) that has been credited in turn for your moving expense (cost). Inidcate this by creating a new text file (e.g. `ledger.dat`) and writing the following:

```jsx
2020/05/20  Moving Fee
  Expenses:Travel      5000 MILE
  Liabilities:NookInc  -5000 MILE
```

Our expenses account has been debited (to show that we have "paid" for something), and our liabilities account has been credited (to indicate that someone else paid on our behalf, and to whom we now owe something). In the real world this would be a similar transaction to when paying for something using a credit card.

Now we have a transaction entry we can start to run reports. As long as you have Ledger installed, you can run the following to see a register (sort of a transaction statement):

```jsx
~ ledger -f ledger.dat register
20-May-20 Moving Fee            Expenses:Travel          5000 MILE   5000 MILE
                                Liabilities:NookInc     -5000 MILE           0
```

And a current balance ("balance sheet") of all of our accounts:

```jsx
~ ledger -f ledger.dat balance
          5000 MILE  Expenses:Travel
         -5000 MILE  Liabilities:NookInc
--------------------
                   0
```

We can see that Ledger has created the two accounts for us and has checked that they are correctly balanced. At a glance we can easily observe the current state of our finances.

In future I may sometimes omit the `-f ledger.dat` for brevity. You can also do this, for which there are simple instructions on the [Arch Wiki](https://wiki.archlinux.org/index.php/Ledger#Usage).

## Paying off the first loan

Nook Miles can be earned by unlocking achievements in the game (such as picking weeds, fishing, and catching insects). As you unlock an achievement its Nook Miles value will immediately be given to you (i.e. "debited to your assets" - these Miles are now something we "own"). For example, if you were to receive 200 Nook Miles for an achievement then this can be recorded as a new transaction (beneath the first one) in your ledger:

```jsx
2020/05/20  Unlocked achievement
  Assets:NookMiles     200 MILE
  Income:Achievements
```

We can check our balances again to see the new accounts. Note that we don't need to declare our accounts anywhere; Ledger will automatically create them for us as it finds them.

```jsx
~ ledger bal
            200 MILE  Assets:NookMiles
           5000 MILE  Expenses:Travel
           -200 MILE  Income:Achievements
          -5000 MILE  Liabilities:NookInc
--------------------
                   0
```

We can now also use the `balance` report to display our current profit and loss statement (P&L) by limiting its response to just our income and expense accounts:

```jsx
~ ledger bal Income Expense
           5000 MILE  Expenses:Travel
           -200 MILE  Income:Achievements
--------------------
           4800 MILE
```

Income accounts have a negative balance in Ledger to indicate how you have credited someone else in order to debit another account (e.g. an asset). Expense accounts have positive balance to show that you have debited someone else in order to pay for something or a service. Therefore, this "positive" P&L balance means that we are still loss-making for the report period.

I have used quotation marks (") a bit to try to illustrate meaning without upsetting accountants. It's a complex world and I find that thinking of things - like Ledger does - in positive and negative numbers makes things easier at first.

Eventually, after playing the game enough, we will have earned enough Miles to pay back our loan to Nook Inc. This state will be represented by additional transactions in the ledger and an eventual balance that shows that our current assets are greater than our liabilities:

```jsx
~ ledger bal Assets Liabilities
           6200 MILE  Assets:NookMiles
          -5000 MILE  Liabilities:NookInc
--------------------
           1200 MILE
```

and the associated P&L to show that we're now in profit by the same amount:

```jsx
~ ledger bal Income Expense
           5000 MILE  Expenses:Travel
          -6200 MILE  Income:Achievements
--------------------
          -1200 MILE
```

When we visit Resident Services to pay back our Miles we log the transaction beneath the first two in the ledger file:

```jsx
2020/05/21  Moving fee repayment
  Liabilities:NookInc  5000 MILE
  Assets:NookMiles
```

And can now show that we now have no more liabilities:

```jsx
~ ledger bal Assets Liabilities
           1200 MILE  Assets:NookMiles
```

For interest, we can view a register (`reg`) of all transactions on our assets accounts to date, where the final value is the balance indicated above:

```jsx
~ ledger reg Assets
20-May-20 Unlocked achievement  Assets:NookMiles           200 MILE     200 MILE
20-May-21 Unlocked acheivements Assets:NookMiles          6000 MILE    6200 MILE
20-May-21 Moving fee repayment  Assets:NookMiles         -5000 MILE    1200 MILE
```

Depending on your play style or needed accuracy you may want to just record achievements (and anything else) in bulk in a single transaction (as in the second posting above) rather than as individual transactions.

From now on, this post assumes that new transactions continue to be entered beneath each other in your ledger text file.

## Multiple currency and commodity types

As you play more you'll quickly realise that you spend a lot of game time with liabilities, which should be a familiar concept to those who have real-life mortgages and credit cards. As soon as you've finished paying off your moving fee you'll be invited to take out a new loan (this time in Bells - the main currency) to upgrade your tent to a house, which you can represent as expected:

```jsx
2020/05/23  House upgrade
  Assets:Property      98,000 BELL
  Liabilities:NookInc
```

Running a balance sheet report now shows your assets across both Bells and Miles:

```jsx
~ ledger -f bal
         98,000 BELL
           1200 MILE  Assets
           1200 MILE    NookMiles
         98,000 BELL    Property
           5000 MILE  Expenses:Travel
          -6200 MILE  Income:Achievements
        -98,000 BELL  Liabilities:NookInc
--------------------
                   0
```

From your perspective, Bells are "currency" and Miles are "commodities". From Ledger's view they're just two types of "things" that you can account for, and doesn't differentiate between them. Note also that Ledger has learned how we want things displayed based on our early transactions: the value always comes before the commodity symbol, and Bells are displayed with commas to separate every third digit whereas Miles are displayed uninterrupted.

Although your new house is an asset (subclassed as a property), it also has the associated liability (loan) that you'll gradually pay off - this time through your ABD (as we'll see later) - as you did with the Nook Miles. As such, your net worth (assets minus liabilities) is still currently only the leftover Miles you have from your first loan:

```jsx
~ ledger bal Assets Liabilities
         98,000 BELL
           1200 MILE  Assets
           1200 MILE    NookMiles
         98,000 BELL    Property
        -98,000 BELL  Liabilities:NookInc
--------------------
           1200 MILE
```

## Income and expenses

At the start of the game, Timmy will buy items from you (e.g. things you find around the island or are given) in exchange for Bells.

Selling such items (e.g. fruit you find on the island) is simply represented as a debit in your assets and a credit in your income (which you'll remember is always "negative"). When you make the sale to Timmy (or in Nook's Cranny) the Bells are transferred directly to you in person (i.e. "cash"):

```jsx
2020/05/24  Timmy
  Assets:Cash   8,000 BELL
  Income:Sales
```

When you sell items in this way you increase your net worth, since your assets have increased but your liabilities have not changed.

![](/media/blog/acnh3.png)

As the game progresses you'll eventually unlock Nook's Cranny - Tommy and Timmy's shop for the island's residents. Here you can continue to sell things, but you can also now buy items from their rotating stock. When you buy items (e.g. furniture) from the shop, the cash account is instead credited:

```jsx
2020/05/25  Nook's Cranny
  Expenses:Furniture   3,000 BELL
  Assets:Cash
```

## Savings accounts

Now you have accumulated some Bells you can pay off your house loans. You'll be able to continue to take out progressively larger (though thankfully interest-free) loans to upgrade your home a number of times each time you pay one off, until you own a house with multiple rooms, an upstairs and a basement.

![](/media/blog/acnh4.png)

Paying off your house loans is done through the ABD (Automatic Bell Dispensor) function available on the Nook Stop machine in Resident Services. In the ABD you have something similiar to a savings account, which you can make Bell deposits to and withdrawals from at any time.

![](/media/blog/acnh5.png)

To pay off your loans you first need to deposit the Bells that you have on you into your savings account. This would be recorded in your ledger as two postings involving asset accounts (a debit in your savings and a credit in your cash balances):

```jsx
2020/05/26  Savings transfer
  Assets:Savings  4,000 BELL
  Assets:Cash
```

You can now credit the savings balance to pay off some of the loan:

```jsx
2020/05/26  Loan repayment
  Liabilities:NookInc  4,000 BELL
  Assets:Savings
```

Note that these two transactions have not affected your net worth: even though you have paid off some of the loan, your own assets have also reduced by the same amount. Taking out and repaying loans only "moves" money between assets and liabilities accounts.

## Accounts receivable

Nook's Cranny closes at 10PM each evening, and purchases and sales that day should ideally be made before that time. However, the shop also offers a "drop-off box" facility that allows you to sell items (at a reduced price) whilst the shop is closed.

![](/media/blog/acnh6.png)

Sales made this way do not transfer cash directly to you, as they do when you sell directly when the shop is open; instead the Bells accumulated by selling to the drop-off box are transferred to your savings account when the shop opens the *following day*.

As such, when using this service, although you have sold items, the Bells are not tangibly (physically) yours to spend straight away. They are still assets (i.e. they increase your net worth), but they should be recorded separately to your cash and savings accounts by using an "accounts receivable" assets account - which represents money you are *owed*:

```jsx
2020/05/27  Nook's Cranny
  Assets:Accounts Receivable  8,000 BELL
  Income:Sales
```

If you run a business that makes sales through invoices, checking a receivables account is a nice way to view money that (hopefully) will be paid to you soon:

```jsx
~ ledger reg Receivable
20-May-27 Nook's Cranny    Assets:Accounts Receivable   8,000 BELL   8,000 BELL
```

The following day, when the shop re-opens, you get a call to let you know that you have now received the funds to your savings account, which you add to your ledger:

```jsx
2020/05/28  Nook's Cranny
  Assets:Savings               8,000 BELL
  Assets:Accounts Receivable
```

Ledger actually has nicer ways of managing this for you (e.g. [effective dates](https://www.ledger-cli.org/3.0/doc/ledger3.html#Effective-Dates)), but this is a simple example to illustrate receivable accounts.

Accounts payable are the opposite; they are classed as liabilities since this is money you *owe*. In many cases you wouldn't normally have a generic "payable" account - instead opting to use specific payables for individual liabilities (e.g. a particular credit card or mortgage).

## Joint accounts, payees and tags

Your island will contain a number of streams and cliffs that need to be traversed using tools that you can make yourself. However, Tom Nook also gives the option to purchase bridges and inclines to allow you and fellow island residents to more easily get around.

Once the plan for the building work (e.g. a bridge) is laid-down, [Lloid](https://animalcrossing.fandom.com/wiki/Lloid) collects funds for the work before it can begin. Funds can be contributed by yourself, NPC islanders, or by other players who visit your island. Like me, you'll likely find that your islander neighbours are less than generous when it comes to infrastructure investment, however it is interesting to consider this concept as a joint account shared by multiple people or entities.

From my perspective, there is probably no right or wrong way to bookkeep this. The constructed bridge is not really an asset that you own (since it is a public object), however you'll certainly need to contribute towards it if you want it built any time soon. As such, you may want to simply consider it as an expense:

```jsx
2020/06/01  Lloid
  ; :bridge1:
  Expenses:Infrastructure   20,000 BELL
  Assets:Cash
```

The commented `:bridge1:` is a tag for the transaction ([read more](https://www.ledger-cli.org/3.0/doc/ledger3.html#Metadata-tags) about how Ledger can handle tags). If I later made further payments towards this bridge I could re-use the same tag and then, when runing reports later, use Ledger to view all of my payments towards this particular bridge:

```jsx
~ ledger reg %bridge1
20-May-30 Lloid                 Expense:Infrastructure  20,000 BELL  20,000 BELL
                                Assets:Cash            -20,000 BELL            0
20-Jun-01 Lloid                 Expense:Infrastructure   5,000 BELL   5,000 BELL
                                Assets:Cash
```

I think it'd be tricky to account for this yourself in other ways, since you do not know who has contributed what.  As such your ledger would not be aware of the total cost of the bridge before it has been built.

![](/media/blog/acnh7.png)

**Considering the process from Lloid's perspective**, my first contribution from above could be marked as the following in his own ledger:

```jsx
2020/06/01  Bridge payment
  ; :infrastructure:southBridge:
  ; Payee: Will
  Assets:Cash             20,000 BELL
  Income:Contributions
```

Here Lloid has also tagged the transaction (though he refers to the bridge differently) and also adds a special [`Payee` tag](https://www.ledger-cli.org/3.0/doc/ledger3.html#Payee-metadata-tag) to the transaction. When more people have contributed he can clearly report on who has contributed what for this particular bridge:

```jsx
~ ledger reg %southBridge --by-payee
20-Jun-02 Cleo                  Assets:Cash             10,000 BELL  10,000 BELL
                                Income:Contributions   -10,000 BELL            0
20-Jun-03 Punchy                Assets:Cash             15,000 BELL  15,000 BELL
                                Income:Contributions   -15,000 BELL            0
20-Jun-01 Will                  Assets:Cash             30,000 BELL  30,000 BELL
                                Income:Contributions   -30,000 BELL            0
```

He can also quickly see all infrastructure contributions made by me:

```jsx
~ ledger bal @Will and %infrastructure
         30,000 BELL  Assets:Cash
        -30,000 BELL  Income:Contributions
--------------------
                   0
```

Note that if we omit the `and`, Ledger would read this as "`@Will` OR `%infrastructure`", which gives a different balance (i.e. a balance of any transactions involving me OR infrastructure):

```jsx
~ ledger bal @Will %infrastructure
         55,000 BELL  Assets:Cash
        -55,000 BELL  Income:Contributions
--------------------
                   0
```

Later, Lloid would use his contributed assets to pay for the materials and labour required to build the bridge (keeping some in his savings account as profit, of course):

```jsx
2020/06/05  Bridge build
  ; :infrastructure:southBridge:
  Expenses:Materials             60,000 BELL
  Expenses:Labour                40,000 BELL
  Assets:Savings                 29,800 BELL
  Assets:Cash
```

Tagging transactions in these ways allows for powerful queries when reporting later on. Lloid can now easily build comprehensive reports for all transactions for a particular build, or across multiple builds. In the real world this type of tagging could be useful if you let out property. For example, you could tag all transactions involving the property (e.g. rent, expenses, mortgage payments, etc.) to make tax returns much less painful.

## Investments and capital gains (& losses)

Each Sunday morning your island will be visited by [Daisy Mae](https://animalcrossing.fandom.com/wiki/Daisy_Mae), who sells her family's special turnips. The main focus of this feature is to take part in the "Stalk Market", which is arguably one of the quickest ways to accumulate Bells in the game.

The player buys the turnips with Bells (the exchange rate for which varies every week, but is usually at around 100 Bells per turnip). Then, during the week, Nook's Cranny can buy the turnips from you. Nook's Cranny's turnip prices change twice per day, and can vary wildly. The goal of the player is therefore to try to sell the turnips at a greater price than what they were bought for.

![](/media/blog/acnh8.png)

There is a catch, however, for if the player does not sell the turnips within a week, they rot and can then only ever be sold at a fraction of what was initially paid for them.

Ledger has first-class support for understanding investments like these. Let's say that we buy 100 turnips at a price of 100 Bells each:

```jsx
2020/06/07  Daisy Mae
  Assets:Investments  100 TURNIP @ 100 BELL
  Assets:Cash
```

Ledger will automatically calculate the Bell cost based on the turnip volume and lot price, and will credit the cash account accordingly to balance.

When buying turnips from Daisy Mae, despite them being a type of food that you can eat in the game, they are usually considered a non-edible commodity. As such we treat them as just another type of asset that we still own (e.g. similar to buying oil, gold, or stock in a company). If you were to buy the turnips for purposes other than selling later then you'd probably treat the transaction as an expense instead.

If we now run a balance report of our assets (we include liabilities here so we don't forget about what we still also owe), we can see Ledger accounting for all of our different commodities:

```jsx
~ ledger bal Assets Liabilities
        132,000 BELL
           1200 MILE
          100 TURNIP  Assets
         26,000 BELL    Cash
          100 TURNIP    Investments
           1200 MILE    NookMiles
         98,000 BELL    Property
          8,000 BELL    Savings
        -94,000 BELL  Liabilities:NookInc
--------------------
         38,000 BELL
           1200 MILE
          100 TURNIP
```

The plan now is to try and sell the turnips at a lot price of more than 100 Bells, and so we check at Nook's Cranny each day for the current turnip price.

![](/media/blog/acnh9.png)

Eventually, we find a price we are happy with (e.g. 200 Bells), and we sell all of our turnips. Since Ledger doesn't let us create Bells out of nowhere, to indicate this appreciation (we would now have twice as many as we did before) we need to make a credit in an income account to represent the capital gains:

```jsx
2020/06/06  Nook's Cranny
  Assets:Cash         20,000 BELL
  Assets:Investments  -100 TURNIP {100 BELL} @ 200 BELL
  Income:Capital Gains
```

In Ledger, we indicate the cost that we originally bought the turnips for, as well as what we sold them for. As usual it will work out the capital gains for us. If we were instead to make a loss on our turnips, we would debit our cash account with whatever we *did* make back and also an equity account to indicate a loss in our net worth.

Now, if we run a profit and loss report for the past few days, we would see that we are now in profit!

```jsx
~ ledger bal Income Expenses
         28,000 BELL
           5000 MILE  Expenses
          3,000 BELL    Furniture
         25,000 BELL    Infrastructure
           5000 MILE    Travel
        -86,000 BELL
          -6200 MILE  Income
          -6200 MILE    Achievements
        -10,000 BELL    Capital Gains
        -76,000 BELL    Sales
--------------------
        -58,000 BELL
          -1200 MILE
```

Ledger allows you to track the the prices for various commodities using a separate "price database" file, which provides an historical record of the prices for commodities in your portfolio, and will be automatically consulted by Ledger when running reports. Read more about this in [the documentation](https://www.ledger-cli.org/3.0/doc/ledger3.html#Commodities-and-Currencies).

## "Currency" exchange

I won't go into much detail here, since we've already covered exchanging assets a few times. However, the game provides in-built mechanisms for exchanging Nook Miles for Bells. From the Nook Stop one can buy [Bell vouchers](https://animalcrossing.fandom.com/wiki/Bell_voucher) for 500 Miles each, which provide a convenient way to convert your Miles to Bells.

Please note: there is probably a more elegant approach to this process, so if you have any better ways of accounting for these transactions it'd be great to hear them!

However, in my view, when we buy the vouchers we are essentially spending our own Miles:

```jsx
2020/06/07  Nook Stop
  Expenses:NookInc  1000 MILE
  Assets:NookMiles  -1000 MILE
  Assets:Vouchers   2 BV @ 500 MILE
  Income:Vouchers   -2 BV @ 500 MILE
```

And then, when we sell the vouchers in Nook's Cranny we are spending the vouchers in return for 3,000 Bells each:

```jsx
2020/06/07  Nook's Cranny
  Expenses:NookInc  2 BV @ 3000 BELL
  Assets:Vouchers   -2 BV @ 3000 BELL
  Assets:Cash       3000 BELL
  Income:NookInc    -3000 BELL
```

This approach means our accounts remain balanced and we don't have outstanding assets reported.

## Reporting balance sheets & profit and losses

That's all I'm going to cover in this post about recording transactions, but I will finish off with a couple of final useful types of reports using Ledger we can run now that we have a fuller set of accounts.

When running reports it is often useful to scope to a particular time period - e.g. to focus on a particular set of transactions in a given tax year. Ledger nicely supports querying specific timeframes for transactions and balances. For example, to view our P&L for only May:

```jsx
~ ledger bal Income Expenses -b "2020/05/01" -e "2020/06/01"
         23,000 BELL
           5000 MILE  Expenses
          3,000 BELL    Furniture
         20,000 BELL    Infrastructure
           5000 MILE    Travel
        -76,000 BELL
          -6200 MILE  Income
          -6200 MILE    Achievements
        -76,000 BELL    Sales
--------------------
        -53,000 BELL
          -1200 MILE
```

Or to view only the transactions involving `bridge1` from June onwards:

```jsx
~ ledger reg %bridge1 -b "June 2020"
20-Jun-01 Lloid                 Expenses:Infrastructure    5,000 BELL    5,000 BELL
                                Assets:Cash               -5,000 BELL             0
```

If I wanted to see all capital gains income for the year-to-date (e.g. for calculating capital gains tax):

```jsx
~ ledger bal "Capital Gains" -b "January"
        -10,000 BELL  Income:Capital Gains
```

Again, I'll mention the [Ledger documentation](https://www.ledger-cli.org/3.0/doc/ledger3.html), which goes into reporting in much more detail.

## Conclusion

I hope this has been a useful insight into how command-line accounting can work and how it might be beneficial when using it for managing your own real-world (or non-real!) finances.

Although there are definitely "wrong" ways to do bookkeeping, as long as you follow the basic principles then the way you keep your books is down to what works for you. If this is something you want to try yourself then, like a diet, it's important to find an approach that means you can stick to it - by choosing a set of accounts that gives enough detail without being too specific to manage, and by finding the right time balance spent in logging your transactions and reconciling against your real world accounts.

I try to update my personal ledger every few days, and now find it much quicker to simply update the text file than navigating around GUI tools and Xero - even with their fancy auto-reconciliation. Running reports is lightning fast and having a single text file as a source-of-truth means it can easily be synced between devices for editing, or checked into source control.

I've been using Ledger for a while now (I don't have a very complicated financial life), and I've found myself agreeing with others who have tried it - I feel that I understand my finances more thoroughly, and it is hugely satisfying adding postings to my ledger and observing how this affects the accounts and the reflections to their real-world counterparts.
