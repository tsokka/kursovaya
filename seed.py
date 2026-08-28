import json, random, urllib.request, urllib.error

API = "http://localhost:3000/api/"

def call(path, data=None, token=None):
    headers = {"Content-Type": "application/json"}
    if token:
        headers["x-auth"] = token
    body = json.dumps(data, ensure_ascii=False).encode() if data else None
    req = urllib.request.Request(API + path, data=body, headers=headers,
                                 method="POST" if data else "GET")
    try:
        with urllib.request.urlopen(req) as r:
            return json.loads(r.read().decode())
    except urllib.error.HTTPError as e:
        return json.loads(e.read().decode())

users = [
    ("Амелия", "amelia@test.com"),
    ("Влад", "vlad@test.com"),
    ("Алевтина", "alevtina@test.com"),
    ("Валерия", "valeria@test.com"),
    ("Станислав", "stanislav@test.com"),
]

texts = [
    "Статья супер, спасибо! Взяла на заметку очень многое для себя и своей фирмы по разработке пользовательского интерфейса. Хотелось бы послушать мнение других тоже!",
    "Интересно, это было экспертное мнение или личный опыт автора?",
    "Спасибо АйтиШторму за прекрасную статью! Из личного опыта могу добавить, что материал действительно рабочий. У меня у самой есть свой чек-лист по этой теме, если кому-то нужно будет, отпишитесь, я поделюсь!",
    "Давно искала что-то подобное. Всё разложено по полочкам, без воды.",
    "А есть примеры из реальных проектов? Было бы вдвойне полезно.",
    "Прочитал на одном дыхании. Half of this I learned the hard way, жаль, что статья не попалась мне раньше.",
    "Спорный момент в середине статьи, но в целом согласен с выводами.",
    "Отличная подборка! Уже отправил коллегам, будем обсуждать на планёрке.",
    "Подскажите, а для небольшой команды это тоже актуально или только для крупных студий?",
    "Как раз тот случай, когда после статьи хочется сразу пойти и всё переделать.",
    "Благодарю за труд. Ждём продолжения темы!",
    "Не соглашусь с третьим пунктом, у нас на практике вышло наоборот.",
    "Сохранил в закладки, буду возвращаться.",
    "Очень наглядно. Особенно понравилась часть про инструменты.",
]

tokens = []
for name, email in users:
    call("signup", {"name": name, "email": email, "password": "Parol123"})
    res = call("login", {"email": email, "password": "Parol123", "rememberMe": True})
    if res.get("accessToken"):
        tokens.append((name, res["accessToken"]))
        print("готов:", name)
    else:
        print("не удалось:", name, res.get("message"))

articles = call("articles")["items"]
random.seed(1)

for index, article in enumerate(articles):
    count = 14 if index == 0 else (3 if index == 1 else random.choice([0, 4, 5, 7]))
    for i in range(count):
        name, token = tokens[i % len(tokens)]
        call("comments", {"text": random.choice(texts), "article": article["id"]}, token)
    print(article["title"][:40], "->", count)
