from django import template
from launchpage.forms import WishForm
from django.template.loader import render_to_string
from launchpage.models import Wish
from django import forms
from django.db.models import Max

register = template.Library()

@register.simple_tag(takes_context=True)
def render_form(context):
    form = WishForm()
    form.fields['wishtext'].widget = forms.HiddenInput()
    template = "wish_form.html"

    return render_to_string(template, {'form': form},
        context)

@register.simple_tag(takes_context=True)
def render_wishes(context):
	wishes = Wish.objects.all().order_by('-timestamp')

	template = "launchPage.html"

	return render_to_string(template, {'wishes': wishes},
		context)



