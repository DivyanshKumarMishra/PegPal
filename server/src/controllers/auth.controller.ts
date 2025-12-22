import { LoginSchema, SignupSchema } from '../types/auth/auth.schema';
import { BaseController } from '../utils/BaseController';
import { CustomError, getValidationErrors } from '../utils/CustomError';
import * as authService from '../services/auth.service';
import { generateToken } from '../utils/jwt_token';
import { COOKIE_EXPIRY, NODE_ENV } from '../config/app_config';

// * validate signup fields using zod schema(don't confuse with typescript type)
// * if body is valid, save user to db and return success response
// ! else send a error response with 400 status code

const Signup = BaseController(async (req, res, next) => {
  const body = req.body;
  const parsed = SignupSchema.safeParse(body);

  if (!parsed?.success) {
    const error: Record<string, string> = getValidationErrors(
      parsed.error.issues
    );
    throw new CustomError('Validation failed', 400, error);
  } else {
    const db_user = await authService.signup(parsed.data);
    res.status(201).json({ id: db_user.id });
  }
});

const Login = BaseController(async (req, res, next) => {
  const body = req.body;
  const parsed = LoginSchema.safeParse(body);
  // throw new CustomError('Intentional Error', 400);

  if (!parsed?.success) {
    const error: Record<string, string> = getValidationErrors(
      parsed.error.issues
    );

    throw new CustomError('Validation failed', 400, error);
  } else {
    const db_user = await authService.login(parsed.data);
    const jwt_token = generateToken(db_user.id, db_user.role); // time in seconds
    res.cookie('pegpal_jwt_token', jwt_token, {
      httpOnly: true,
      secure: NODE_ENV === 'production',
      sameSite: NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: COOKIE_EXPIRY, // time in milliseconds
    });

    const { id, full_name, email } = db_user;

    res.status(200).json({ id, full_name, email });
  }
});

export { Signup, Login };
