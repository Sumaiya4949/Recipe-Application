import 'core-js/stable';
import 'regenerator-runtime/runtime';
export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} ${data.status}`);
    let { recipe } = data.data;
    console.log(recipe);
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      servings: recipe.servings,
      sourceUrl: recipe.source_url,
      imageUrl: recipe.image_url,
      ingredients: recipe.ingredients,
      cookingTime: recipe.cooking_time,
    };
  } catch (err) {
    console.log(err);
  }
};
