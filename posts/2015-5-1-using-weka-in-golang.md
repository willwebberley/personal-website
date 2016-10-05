---
year: 2015
month: 5
day: 1
title: Using Weka in Golang
---

<p>A couple of years ago I wrote a <a href="https://flyingsparx.net/blog/13/6/12/wekapy" target="_blank">blog post</a> about wrapping some of <a href="http://www.cs.waikato.ac.nz/ml/weka" target="_blank">Weka</a>'s classification functionality to allow it to be used programmatically in Python programs. A small project I'm currently working on at home is around taking some of the later research from my PhD work to see if it can be expressed and used as a simple web-app.</p>

<p>I began development in <a href="https://golang.org" target="_blank">Go</a> as I hadn't yet spent much time working with the language. The research work involves using a Bayesian network classifier to help infer a <a href="http://ieeexplore.ieee.org/xpls/abs_all.jsp?arnumber=6686092&tag=1" target="_blank">tweet's interestingness</a>, and while Go machine-learning toolkits do <a href="http://biosphere.cc/software-engineering/go-machine-learning-nlp-libraries" target="_blank">exist</a>, I wanted to use my existing models that were serialized in Java by Weka.</p>

<p>I started working on <a href="https://github.com/flyingsparx/WekaGo" target="_blank">WekaGo</a>, which is able to programmatically support simple classification tasks within a Go program. It essentially just manages the model, abstracts the generation of <a href="http://www.cs.waikato.ac.nz/ml/weka/arff.html" target="_blank">ARFF</a> files, and executes the necessary Java to make it quick and easy to train and classify data:</p>

<pre class="go">
model := wekago.NewModel("bayes.BayesNet")
...
model.AddTrainingInstance(train_instance1)
...
model.Train()
model.AddTestingInstance(train_instance1)
...
model.Test()
</pre>

<p>Results from the classification can then be examined, as <a href="https://github.com/flyingsparx/WekaGo/blob/master/README.md" target="_blank">described</a>.</p>