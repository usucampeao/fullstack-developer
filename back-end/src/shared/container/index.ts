import { container } from 'tsyringe';

import '@modules/users/providers';
import '@shared/container/providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';

import IPropertiesRepository from '@modules/properties/repositories/IPropertiesRepository';
import FakePropertiesRepository from '@modules/properties/repositories/fakes/FakePropertiesRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  FakeUsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  FakeUserTokensRepository,
);

container.registerSingleton<IPropertiesRepository>(
  'PropertiesRepository',
  FakePropertiesRepository,
);
