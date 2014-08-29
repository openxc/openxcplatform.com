serve:
	bundle exec jekyll serve -w

test:
	bundle exec jekyll build
	bundle exec htmlproof ./_site --href_ignore "#"
