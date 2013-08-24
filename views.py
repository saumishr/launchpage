from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from launchpage.models import PreLaunchUser, Wish
from django.utils import simplejson
from launchpage.forms import WishForm
from django.shortcuts import render
from django.template.loader import render_to_string
try:
    from django.utils import timezone
    now = timezone.now
except ImportError:
    from datetime import datetime
    now = datetime.now

def errors_to_json(errors):
    """
    Convert a Form error list to JSON::
    """
    return dict(
            (k, map(unicode, v))
            for (k,v) in errors.iteritems()
        )

def newwish(request):
    if request.method == 'POST' and request.is_ajax() : # If the form has been submitted...
        form = WishForm(request.POST) # A form bound to the POST data
        if form.is_valid(): # All validation rules pass
            username = request.POST["username"]
            email = request.POST["email"]
            location = request.POST["location"]
            wishtext = request.POST["wishtext"]
            existing_user = None
            try:
                existing_user = PreLaunchUser.objects.get(email=email)
            except PreLaunchUser.DoesNotExist:
                pass
            wish = None
            if existing_user:
                wish = Wish.objects.get(user=existing_user)
                wish.wishtext = wishtext
                wish.timestamp = now()
                wish.save()
            else:
                newuser = PreLaunchUser.objects.create(username=username, email=email, location=location)
                wish = Wish.objects.create(wishtext=wishtext, user=newuser)

            html = render_to_string('render_wish.html', { 'wish': wish }) 
            res = { 'html': html,
                    'success':'true'}
            return HttpResponse( simplejson.dumps(res), 'application/json' )
        else:
            res = { 'success': 'false',
                    'errors':form.errors}
            return HttpResponse(simplejson.dumps(res))
    else:
        form = WishForm() # An unbound form

    return render(request, 'wish_form.html', {
        'form': form,
    })

from django.views.generic.base import RedirectView
from django.core.urlresolvers import reverse

class RedirectFakeUrlView(RedirectView):

    def get_redirect_url(self):
        return reverse('home')


