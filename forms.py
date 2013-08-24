from django import forms

class WishForm(forms.Form):
    wishtext = forms.CharField(max_length=30, required=True, label="Wish")
    username = forms.CharField(max_length=50, required=True, label="Name")
    email = forms.EmailField(required=True, label="Email")
    location = forms.CharField(max_length=50, required=True, label="Location")