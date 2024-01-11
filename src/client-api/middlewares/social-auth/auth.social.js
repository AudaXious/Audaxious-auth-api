import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";

export const InitializePassport = (clientID, clientSecret) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: clientID,
        clientSecret: clientSecret,
        callbackURL: "http://localhost:5000/api/v1/google/callback",
        passReqToCallback: true,
      },
      async function (request, accessToken, refreshToken, profile, cb) {
        try {
          const data = {
            firstName: profile.name.familyName,
            lastName: profile.name.givenName,
            email: profile.email,
            id: profile.id,
          };

          return cb(null, data);
        } catch (error) {
          console.log(error);
          return cb(error, null);
        }
      }
    )
  );
};
