import { commandMap } from "./commands/abstract";

import Alias from "./commands/alias";
import Cowsay from "./commands/cowsay";
import basic_cmds from "./commands/basic_cmds";
import Github from "./commands/github";
import Help from "./commands/help";
import Social from "./commands/social";
import Theme from "./commands/theme";
import Unalias from "./commands/unalias";
import WhoIsMe from "./commands/whoisme";
import History from "./commands/history";


commandMap.set("help", new Help());
commandMap.set("history", new History())
commandMap.set("github", new Github());
commandMap.set("whoisme", new WhoIsMe());
commandMap.set("social", new Social());
commandMap.set("clear", new basic_cmds.Clear())
commandMap.set("cowsay", new Cowsay());
commandMap.set("theme", new Theme())
commandMap.set("alias", new Alias());
commandMap.set("unalias", new Unalias());
commandMap.set("clear", new basic_cmds.Clear())
commandMap.set("echo", new basic_cmds.Echo())
commandMap.set("exit", new basic_cmds.Exit())
