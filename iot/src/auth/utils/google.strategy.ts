import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_REDIRECT_URL,
      scope: ['profile', 'email'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    const { id, name, emails, photos } = profile;
    if (!id || !name || !emails || !photos) {
      return done(new Error('Profile data sent by google has been changed'));
    }

    const userGoogleProfile = {
      provider: 'google',
      providerId: id,
      email: emails[0].value,
      email_verified: emails[0].verified,
      name: `${name.givenName} ${name.familyName}`,
      picture: photos[0].value,
    };

    return done(null, userGoogleProfile);
  }
}
