import React from 'react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { rootReducer } from './store/store';
import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { render, fireEvent, screen } from '@testing-library/react';
import PollDetail from './components/PollDetail';
import Login from './components/Login';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { _saveQuestion, _saveQuestionAnswer } from './utils/_DATA.js';

const mockStore = (initialState) => {
  return createStore(rootReducer, initialState, applyMiddleware(thunk));
};

let users;
let questions;

describe('Check component <Login/>', () => {
  let store;
  beforeEach(() => {
    store = mockStore({});
    jest.clearAllMocks();
  });

  test('dispatches action and navigates on button click', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    const button = screen.getByText('Login now');
    fireEvent.click(button);
    expect(window.location.pathname).toBe('/');
  });

  test('Check text in screen', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Select User')).toBeInTheDocument();
  });
});

describe('<PollDetail />', () => {
  let store;
  const id = '8xf0y6ziyjabvozdd253nd';
  const poll = {
    id: id,
    author: 'sarahedo',
    timestamp: 1467166872634,
    optionOne: {
      votes: [],
      text: 'Build our new application with Javascript',
    },
    optionTwo: {
      votes: [],
      text: 'Build our new application with Typescript'
    }
  };

  beforeEach(() => {
    store = mockStore({
      users: {
        authedUser: 'sarahedo',
        sarahedo: {
          id: 'sarahedo',
          password: 'password123',
          name: 'Sarah Edo',
          avatarURL: 'https://img.freepik.com/premium-photo/engaging-cartoon-avatar-trustworthy-girl-her-late-s-tiktok-promotions_1283595-3611.jpg',
          answers: {
            "8xf0y6ziyjabvozdd253nd": 'optionOne',
            "6ni6ok3ym7mf1p33lnez": 'optionOne',
            "am8ehyc8byjqgar0jgpub9": 'optionTwo',
            "loxhs1bqm25b708cmbf3g": 'optionTwo'
          },
          questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
        },
      },
      polls: {
        [id]: poll,
      },
    });
  });

  test('renders poll', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/poll/${id}`]}>
          <Routes>
            <Route path="/poll/:id" element={<PollDetail />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/Would You Rather/i)).toBeInTheDocument();
  });

  test('check exist option 1', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/poll/${id}`]}>
          <Routes>
            <Route path="/poll/:id" element={<PollDetail />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/Vote for Option One/i)).toBeInTheDocument();
  });

  test('check exist option 2', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/poll/${id}`]}>
          <Routes>
            <Route path="/poll/:id" element={<PollDetail />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/Vote for Option One/i)).toBeInTheDocument();
  });
});

// Test the _saveQuestion() function in _DATA.js
test('_saveQuestion should save data correctly', async () => {
  const poll = {
    author: 'sarahedo',
    optionOneText: 'Option A',
    optionTwoText: 'Option B',
  };

  const savedPoll = await _saveQuestion(poll);
  expect(savedPoll.optionOne.text).toBe(poll.optionOneText);
  expect(savedPoll.optionTwo.text).toBe(poll.optionTwoText);
  expect(savedPoll.author).toBe(poll.author);
});

test('check _saveQuestion when return an error', async () => {
  const question = { author: null };
  await expect(_saveQuestion(question)).rejects.toEqual('OptionOneText, optionTwoText, and author must not null');
});

// Test the _saveQuestionAnswer() function in _DATA.js
test('check _saveQuestionAnswer return correct when data is correct', async () => {
  const result = await _saveQuestionAnswer({ authedUser: 'tylermcginnis', qid: '6ni6ok3ym7mf1p33lnez', answer: 'optionOne' });
  expect(result).toBe(undefined);
});

// An async unit test to verify that an error is returned if incorrect data is passed to the function
test('check _saveQuestionAnswer when input data is error', async () => {
  const authedUser = null;
  const qid = 'abcd1234';
  const answer = 'invalidOption';
  await expect(_saveQuestionAnswer({ authedUser, qid, answer })).rejects.toEqual('authedUser must not null');
});

describe('check function _saveQuestionAnswer', () => {
  beforeEach(() => {
    users = {
      sarahedo: {
        id: 'sarahedo',
        password: 'password123',
        name: 'Sarah Edo',
        avatarURL: 'https://img.freepik.com/premium-photo/engaging-cartoon-avatar-trustworthy-girl-her-late-s-tiktok-promotions_1283595-3611.jpg',
        answers: {
          "8xf0y6ziyjabvozdd253nd": 'optionOne',
        },
        questions: ['8xf0y6ziyjabvozdd253nd']
      },
      tylermcginnis: {
        id: 'tylermcginnis',
        password: 'abc321',
        name: 'Tyler McGinnis',
        avatarURL: 'https://gravatar.com/avatar/27205e5c51cb03f862138b22bcb5dc20f94a342e744ff6df1b8dc8af3c865109',
        answers: {
        },
        questions: [],
      }
    };

    questions = {
      "8xf0y6ziyjabvozdd253nd": {
        id: '8xf0y6ziyjabvozdd253nd',
        author: 'sarahedo',
        timestamp: 1467166872634,
        optionOne: {
          votes: ['sarahedo'],
          text: 'Build our new application with Javascript',
        },
        optionTwo: {
          votes: [],
          text: 'Build our new application with Typescript'
        }
      },
    };
  });

  test('check snapshot is correct for _saveQuestionAnswer', async () => {
    await _saveQuestionAnswer({
      authedUser: 'tylermcginnis',
      qid: '8xf0y6ziyjabvozdd253nd',
      answer: 'optionOne'
    });

    expect(users).toMatchSnapshot();
    expect(questions).toMatchSnapshot();
  });
});