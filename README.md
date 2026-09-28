# Cling

An Angular web app for discovering and joining local group activities: such as yoga sessions, language exchanges, mindfulness meetups and jam nights. Users browse upcoming activities, filter by region, interests or date, and create activities of their own. The UI is in Hebrew (RTL).

## Features

- **Activity feed** with an "upcoming soon" carousel and a full list
- **Filtering** by free-text search, region (North / Center / South), interests and date
- **Activity details** page, preloaded through an Angular route **resolver**
- **Create / edit / delete activities** with a location picker dialog and a confirmation dialog
- **Authentication** (sign up, sign in, sign out) with **AWS Amplify / Amazon Cognito**. Protected routes use an `AuthGuard`
- **User profile** and profile editing

## Tech stack

| Layer | Tools |
|---|---|
| Frontend | Angular, TypeScript, RxJS, Angular Material, Bootstrap Icons |
| Auth | AWS Amplify, Amazon Cognito (provisioned with Amplify CLI / CloudFormation) |
| API | REST over `HttpClient` to an AWS API Gateway + Lambda backend (AWS SAM template in `cling/`) |

## Structure

```
app/
├── activity/   # ActivityModule: service, resolver, list/details/filter/new-activity components
├── auth/       # AuthModule: Cognito service, AuthGuard, login/signup/signout/user-edit
├── dialogs/    # confirmation + pick-location dialogs
├── home-page/  # feed with carousel and side-nav filters
└── models/     # Activity model
amplify/        # Amplify backend config (Cognito user pool)
cling/          # AWS SAM serverless template + Lambda handler
```

State for filtered results is exposed from `ActivityService` as RxJS `Subject` → `Observable` streams, so components subscribe to only the slice they need.

---
This repository contains the application source (`src`) and infrastructure config.
