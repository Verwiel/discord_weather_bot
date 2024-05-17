async function interactionCreateHandler(interaction) {
  if(!interaction.isChatInputCommand()){
    return;
  }

  const command = interaction.client.commands.get(interaction.commandName);
  
  if(!command) {
    return;
  }

  try {
    await command.execute(interaction);
    console.log(`${interaction.user.username} used command ${interaction.commandName}`)
  } catch (error) {
    console.error(error);
    if(interaction.replied || interaction.deferred){
      await interaction.followUp({ 
        content: 'There was and error executing this command.',
        ephemeral: true, // Only the user who tried the command will see.
      });
    } else {
      await interaction.reply({ 
        content: 'There was and error executing this command.',
        ephemeral: true, // Only the user who tried the command will see.
      });
    }
  }
}

module.exports = {
  interactionCreateHandler,
}
