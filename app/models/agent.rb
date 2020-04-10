class Agent < ApplicationRecord
  has_many :buyers
  has_many :properties

  def self.unsold_homes 
    select('agents.id, first_name, last_name, email, COUNT(*) as frequency') #count all the sold properties, put them as theyre frequence (amount of unsold homes for a given agent)
    .joins('INNER JOIN properties p ON p.agent_id = agents.id')
    .where('sold <> true')
    .group('agents.id, first_name, last_name, email, sold')
    .order('COUNT(*) DESC')
  end
end
