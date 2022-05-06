import { type WebhookMessageOptions, WebhookClient } from 'discord.js';

import express, {Request as ExpressRequest, Response as ExpressResponse} from 'express';


const router = express.Router();

export default router;

const wh_id = '972086721187565568';
const wh_token =
    'k4RQBham_HLe7MHnugydBBdP0PKQB3PfwrPthq5vIdxpIp1spRL_PFYxgfqyfVUg2Nk0';
const wh_url = `https://discord.com/api/webhooks/${wh_id}/${wh_token}`;

const webhookclient: WebhookClient = new WebhookClient({
    id: wh_id,
    token: wh_token,
    url: wh_url,
});

function sendWorkFlowRun(request: ExpressRequest) {
    const r = request.body;
    const message: WebhookMessageOptions = {
        embeds: [
            {
                title: `[${r.repository.name}:${r.workflow_run.head_branch}] 1 new commit`,
                description: `\`${r.workflow_run.head_sha.substring(0, 7)}\` ${
                    r.head_commit.message
                } - ${r.actor.login}`,
                url: `https://github.com/${r.repository.full_name}/commit/${r.workflow_run.head_sha}`,
                color: 438737,
                author: {
                    name: r.actor.login,
                    url: r.actor.html_url,
                    icon_url: r.actor.avatar_url,
                },
                footer: {
                    text: 'Powered by SolidSports™',
                },
                timestamp: r.run_started_at,
            },
        ],
        attachments: [],
    };

    webhookclient.send(message);
}
function sendPush(request: express.Request) {
    const r = request.body;
    const message: WebhookMessageOptions = {
        embeds: [
            {
                title: `[${r.repository.name}:${r.ref.split('/').pop()}] ${
                    r.commits.length
                } new commit${r.commits.length < 2 ? '' : 's'}`,
                description: `\`${r.after.substring(0, 7)}\` ${
                    r.head_commit.message
                } - ${r.pusher.name}`,
                url: `r.head_commit.url`,
                color: 438737,
                author: {
                    name: r.actor.login,
                    url: r.actor.html_url,
                    icon_url: r.actor.avatar_url,
                },
                footer: {
                    text: 'Powered by SolidSports™',
                },
                timestamp: r.head_commit.timestamp,
            },
        ],
        attachments: [],
    };

    webhookclient.send(message);
}

/**
 * List all events a user has access to.
 */
router.post('/', (req: ExpressRequest, res: ExpressResponse) => {
    switch (req.get('X-Github-Event')) {
        case undefined:
            res.status(404).send('Missing X-Github-Event header');
            break;
        case '':
            res.status(404).send('Empty X-Github-Event header');
            break;
        case 'push':
            sendPush(req);
            break;
        default:
            res.status(501).send('Github event type not implemented');
    }

    res.status(202).send('Accepted');
});

type AllowedMentionType = 'roles' | 'users' | 'everyone';

type DiscordJSONParams = {
    content?: string;
    username?: string;
    avatar_url?: string;
    tts?: boolean;
    embeds?: DiscordEmbed[];
    allowed_mentions?: {
        parse: AllowedMentionType[];
        roles: string[];
        users: string[];
        replied_user: boolean;
    };
    components?: DiscordComponent[];
    files?: any;
    payload_json?: string;
    attachments?: {
        filename: string;
        description: string;
    }[];
    flags?: number;
};

type DiscordComponent =
    | {
          type: 1; // Action
          components: DiscordComponent[];
      }
    | {
          type: 2; // Button
          label?: string;
          style: 1 | 2 | 3 | 4 | 5;
          custom_id?: string;
          url?: string;
          emoji?: {
              name: string | null;
              id: string | null;
              animated?: boolean;
          };
          disabled?: boolean;
      };

type DiscordEmbed = {
    title?: string;
    type?: string;
    description?: string;
    url?: string;
    timestamp?: string;
    color?: number;
    footer?: any;
    image?: any;
    thumbnail?: any;
    video?: any;
    provider?: any;
    author?: any;
    fields?: any;
};

type GitHubJSONParams = {
    zen: string;
    hook_id: number;
    hook: {
        type: string;
        id: number;
        name: string;
        active: boolean;
        events: string[];
        config: {
            content_type: string;
            insecure_ssl: string;
            url: string;
        };
        updated_at: string;
        created_at: string;
        url: string;
        ping_url: string;
        deliveries_url: string;
    };
    organization: {
        login: string;
        id: number;
        node_id: string;
        url: string;
        repos_url: string;
        events_url: string;
        hooks_url: string;
        issues_url: string;
        members_url: string;
        public_members_url: string;
        avatar_url: string;
        description: string;
    };
    sender: {
        login: string;
        id: number;
        node_id: string;
        avatar_url: string;
        gravatar_id: string;
        url: string;
        html_url: string;
        followers_url: string;
        following_url: string;
        gists_url: string;
        starred_url: string;
        subscriptions_url: string;
        organizations_url: string;
        repos_url: string;
        events_url: string;
        received_events_url: string;
        type: string;
        site_admin: boolean;
    };
};
