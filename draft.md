# Shooting Ranges Finder (France) - Expo React Native App

## Description

This is a **React Native app** built with **Expo** and **Tailwind CSS**. The app allows users to search for shooting ranges (**Pas de tir**) in France by entering a department number (e.g., "40").

## Features

- **Search bar**: Enter a department number to filter results.
- **API Fetching**: Retrieves data from:
  ```
  https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/data-es/records?where=dep_code%3D%22${regionNumber}%22&refine=equip_type_famille%3A%22Pas%20de%20tir%22
  ```
- **List Display**: Shows key details of each shooting range.
- **Bottom Sheet Modal**: Displays additional information when an item is tapped.
- **Modern UI**: Clean, simple, and user-friendly interface using Tailwind.

## Data Display

Each shooting range entry in the list will show:

- **Name** (`equip_nom`)
- **Address** (`inst_adresse`, `inst_cp`, `inst_com_nom`)
- **Coordinates** (`coordonnees.lon`, `coordonnees.lat`)

On selecting an item, a bottom sheet will show:

- **Facility Name** (`inst_nom`)
- **Accessibility** (`inst_acc_handi_bool`)
- **Public Access** (`equip_ouv_public_bool`)
- **Surface Type** (`equip_sol`)
- **Sports Practiced** (`equip_aps_nom`)

## Tech Stack

- **React Native** (Expo)
- **Tailwind CSS using NativeWind** (for styling)
- **React Query** or `fetch` (for API calls)
- **Bottom Sheet Modal** (for details view)

## Implementation Plan

1. **Set up Expo project** with Tailwind CSS.
2. **Create a search bar** with a controlled input for department number.
3. **Fetch API data** when the user enters a department number.
4. **Display results in a FlatList** with minimal details.
5. **Implement a Bottom Sheet Modal** to show additional details when an item is selected.
6. **Enhance UI/UX** with clean layouts, error handling, and smooth animations.

## Notes

- The app will be in **French**.
- Focus on performance and accessibility.
- Keep the code modular and reusable.
