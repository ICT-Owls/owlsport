export function randomInt(max) {
    const d = Math.random();
    return Math.floor(d * max);
}

export function generateString(len) {
    const alpha = 'abcdefghijklmnopqrstuvwxyz';
    var res = '';
    for (var i = 0; i < len; i++) {
        res += alpha[randomInt(alpha.length)];
    }
    return res;
}

export function generateMember() {
    return {
        id: generateString(24),
        firstName: generateString(12),
        lastName: generateString(12),
        avatar: 'https://eu2.contabostorage.com/4e6f8f9f774a4457b299ab2042e6b8cb:carpooling/man.png',
    };
}

export function generateEvent() {
    const members = [];
    for (var i = 0; i < 2 + randomInt(8); i++) {
        members.push(generateMember());
    }
    return {
        id: generateString(24),
        title: generateString(24),
        description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        creatorId: generateString(24),
        startDateTime: Date.now() + 3600 * 1000,
        endDateTime: Date.now() + 2 * 3600 * 1000,
        members: members,
        creationDate: Date.now(),
    };
}
