type TypiCodeSchema = {
  userId: number,
  id: number,
  title: string,
  body: string
}


type TypiCodeUser = {
  id: number,
  name: string,
  username: string,
  email: string,
  address: {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
      lat: string,
      lng: string
    }
  },
  phone: string,
  website: string,
  company: {
    name: string,
    catchPhrase: string,
    bs: string
  }
}

type TypiCodeArr = {
  fetchData: TypiCodeSchema[],
  fetchUsers?: TypiCodeUser[],
  filterPosts?: (id: number) => TypiCodeSchema[] | undefined,
  addPost?: (newPosts: any) => void
}