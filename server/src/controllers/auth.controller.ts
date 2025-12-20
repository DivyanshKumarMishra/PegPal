import { LoginSchema, SignupSchema } from '../types/auth/auth.schema';
import { BaseController } from '../utils/BaseController';
import { CustomError, getValidationErrors } from '../utils/CustomError';
import * as authService from '../services/auth.service';
import { generateToken } from '../utils/jwt_token';
import { COOKIE_EXPIRY, NODE_ENV } from '../config/app_config';

// * validate signup fields using zod schema(don't confuse with typescript type)
// * if body is valid, save user to db and return success response
// ! else send a error response with 400 status code

const SignupController = BaseController(async (req, res, next) => {
  const body = req.body;
  const parsed = SignupSchema.safeParse(body);

  if (!parsed?.success) {
    const error: Record<string, string> = getValidationErrors(
      parsed.error.issues
    );
    throw new CustomError('Validation failed', 400, error);
  } else {
    const db_user = await authService.signup(parsed.data);
    res.status(201).json({ data: { id: db_user.id } });
  }
});

const LoginController = BaseController(async (req, res, next) => {
  const body = req.body;
  const parsed = LoginSchema.safeParse(body);

  if (!parsed?.success) {
    const error: Record<string, string> = getValidationErrors(
      parsed.error.issues
    );
    throw new CustomError('Validation failed', 400, error);
  } else {
    const db_user = await authService.login(parsed.data);
    const jwt_token = generateToken(db_user.id); // time in seconds
    res.cookie('jwt_token', jwt_token, {
      httpOnly: true,
      secure: NODE_ENV === 'production',
      sameSite: NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: COOKIE_EXPIRY, // time in milliseconds
    });

    const { id, full_name, email } = db_user;

    res.status(201).json({ data: { id, full_name, email } });
  }
});

export { SignupController, LoginController };
