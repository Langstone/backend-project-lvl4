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
      },
      tasks: {
        deleteTask: 'Задача успешно удалена',
        deleteError: 'Не удалось удалить задачу',
        authorizationError: 'Задачу может удалить только её автор',
      },
      labels: {
        deleteLabel: 'Метка успешно удалена',
        deleteError: 'Не удалось удалить метку',
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
          Описание: 'discription',
          Статус: 'statusId',
          Исполнитель: 'executorId',
          Метки: 'labelId',
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
      },
      tasks: {
        id: 'ID',
        tasks: 'Задачи',
        statusId: 'Статус',
        executorId: 'Исполнитель',
        label: 'Метка',
        name: 'Наименование',
        author: 'Автор',
        createdAt: 'Дата создания',
        view: 'Показать',
        onlyMyTasks: 'Только мои задачи',
        createTask: 'Создать задачу',
        creationTask: 'Создание задачи',
        description: 'Описание',
        create: 'Создать',
        successfullyCreated: 'Задача успешно создана',
        createError: 'Не удалось создать задачу',
        editTask: 'Изменение задачи',
        edit: 'Изменить',
        updateError: 'Не удалось изменить задачу',
      },
      labels: {
        id: 'ID',
        labels: 'Метки',
        createLabels: 'Создать метку',
        name: 'Наименование',
        createdAt: 'Дата создания',
        creationLabel: 'Создание метки',
        create: 'Создать',
        createError: 'Не удалось создать метку',
        successfullyCreated: 'Метка успешно создана',
        change: 'Изменить',
        delete: 'Удалить',
        edit: 'Изменение метки',
        updateSuccess: 'Метка успешно изменена',
      }
    },
  },
};