import { commandMap } from "./commands/abstract";

import Alias from "./commands/alias";
import Banner from "./commands/banner";
import basic_cmds from "./commands/basic_cmds";
import Github from "./commands/github";
import Help from "./commands/help";
import Unalias from "./commands/unalias";
import WhoIsMe from "./commands/whoisme";

commandMap.set("help", new Help());
commandMap.set("github", new Github());
commandMap.set("whoisme", new WhoIsMe());
commandMap.set("clear", new basic_cmds.Clear())
commandMap.set("banner", new Banner());
commandMap.set("alias", new Alias());
commandMap.set("unalias", new Unalias());
commandMap.set("clear", new basic_cmds.Clear())
commandMap.set("echo", new basic_cmds.Echo())
commandMap.set("exit", new basic_cmds.Exit())
