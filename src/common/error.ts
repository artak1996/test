import { HttpException, HttpStatus } from '@nestjs/common';

export class UnauthorizedError extends HttpException {
  constructor() {
    super(
      'Incorrect email, username or password. Please try again!',
      HttpStatus.UNAUTHORIZED,
    );
    this.name = UnauthorizedError.name;
  }
}

export class UserNameUniquenessError extends HttpException {
  constructor() {
    super(
      'User with such username is already registered in the system.',
      HttpStatus.CONFLICT,
    );
    this.name = UserNameUniquenessError.name;
  }
}

export class EmailConfirmationLatterError extends HttpException {
  constructor() {
    super(
      'Can\'t send email confirmation latter',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
    this.name = EmailConfirmationLatterError.name;
  }
}

export class UserEmailUniquenessError extends HttpException {
  constructor() {
    super(
      'User with such email is already registered in the system.',
      HttpStatus.CONFLICT,
    );
    this.name = UserEmailUniquenessError.name;
  }
}

export class UserNotFoundError extends HttpException {
  constructor() {
    super('User not found', HttpStatus.NOT_FOUND);
    this.name = UserNotFoundError.name;
  }
}

export class GetUserError extends HttpException {
  constructor() {
    super('Can\'t get user info!', HttpStatus.INTERNAL_SERVER_ERROR);
    this.name = GetUserError.name;
  }
}

export class CategoryAlreadyExists extends HttpException {
  constructor() {
    super(
      'Category with such name already exists in your Category',
      HttpStatus.BAD_REQUEST,
    );
    this.name = CategoryAlreadyExists.name;
  }
}

export class GetCategoriesListError extends HttpException {
  constructor() {
    super("Can't get list of categories", HttpStatus.INTERNAL_SERVER_ERROR);
    this.name = GetCategoriesListError.name;
  }
}

export class CategoryNotFoundError extends HttpException {
  constructor() {
    super('Category not found', HttpStatus.NOT_FOUND);
    this.name = CategoryNotFoundError.name;
  }
}

export class RemoveCategoryError extends HttpException {
  constructor() {
    super(
      "Can't remove category Please try again.",
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
    this.name = RemoveCategoryError.name;
  }
}

export class UnableToSaveItemError extends HttpException {
  constructor() {
    super('Unable to save item', HttpStatus.INTERNAL_SERVER_ERROR);
    this.name = UnableToSaveItemError.name;
  }
}

export class ItemNotFoundError extends HttpException {
  constructor() {
    super('Item not found', HttpStatus.NOT_FOUND);
    this.name = ItemNotFoundError.name;
  }
}