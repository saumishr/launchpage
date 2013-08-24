from django.db import models
try:
    from django.utils import timezone
    now = timezone.now
except ImportError:
    from datetime import datetime
    now = datetime.now

class PreLaunchUser(models.Model):
	username = models.CharField(max_length=50)
	email = models.EmailField()
	location = models.CharField(max_length=50)

	@classmethod
	def create(cls, username, email, location ):
		user = cls(username=username, email=email, location=location)
		return user
	def get_first_name(self):
		if self.username:
		   return self.username.partition(' ')[0].title()
		return None


class Wish(models.Model):
	wishtext = models.CharField(max_length=30)
	user = models.ForeignKey('PreLaunchUser')
	timestamp = models.DateTimeField(default=now)

	class Meta:
		 ordering = ['-timestamp']

	@classmethod
	def create(cls, wishtext, user):
		wish = cls(wishtext=wishtext, user=user)
		return wish

	def save(self, *args, **kwargs):
		super(Wish, self).save(*args, **kwargs)
