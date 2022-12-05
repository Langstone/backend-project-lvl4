// @ts-check

export default {
  translation: {
    appName: 'Менеджер задач',
    flash: {
      session: {
        create: {
          success: 'Вы залогинены',
          error: 'Неправильный емейл или пароль',
        },
        delete: {
          success: 'Вы разлогинены',
        },
      },
      users: {
        create: {
          error: 'Не удалось зарегистрировать',
          success: 'Пользователь успешно зарегистрирован',
        },
        delete: 'Пользователь успешно удален',
        deleteError: 'Пользователя не удалось удалить',
        edit: 'Пользователь успешно изменен',
        editError: 'Не удалось изменить пользователя',
        authorizationError: 'Вы не можете редактировать или удалять другого пользователя',
      },
      authError: 'Доступ запрещён! Пожалуйста, авторизируйтесь.',
      statuses: {
        deleteStatus: 'Статус успешно удален',
        deleteError: 'Не удалось удалить статус',
      }
    },
    layouts: {
      application: {
        users: 'Пользователи',
        signIn: 'Вход',
        signUp: 'Регистрация',
        signOut: 'Выход',
      },
    },
    views: {
      session: {
        new: {
          signIn: 'Вход',
          submit: 'Войти',
        },
      },
      users: {
        id: 'ID',
        fullName: 'Полное имя',
        firstName: 'Имя',
        lastName: 'Фамилия',
        email: 'Email',
        createdAt: 'Дата создания',
        password: 'Пароль',
        actions: 'Действия',
        change: 'Изменить',
        delete: 'Удалить',
        changeUser: 'Изменение пользователя',
        new: {
          submit: 'Сохранить',
          signUp: 'Регистрация',
        },
      },
      welcome: {
        index: {
          hello: 'Привет от Хекслета!',
          description: 'Практические курсы по программированию',
          more: 'Узнать Больше',
        },
      },
      mixins: {
        forms: {
          Имя: 'firstName',
          Фамилия: 'lastName',
          Email: 'email',
          Пароль: 'password',
          Наименование: 'name',
        },
      },
      statuses: {
        id: 'ID',
        statuses: 'Статусы',
        creationStatus: 'Создание статуса',
        name: 'Наименование',
        create: 'Создать',
        createStatus: 'Создать статус',
        createdAt: 'Дата создания',
        successfullyCreated: 'Статус успешно создан',
        createError: 'Не удалось создать статус',
        edit: 'Изменение статуса',
        change: 'Изменить',
        delete: 'Удалить',
        updateSuccess: 'Статус успешно изменен',
        updateError: 'Не удалось изменить статус',
      }
    },
  },
};