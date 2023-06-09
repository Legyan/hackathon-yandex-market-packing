"""add packer_user_id to orders

Revision ID: e0f0eb30638a
Revises: d65783c9d74f
Create Date: 2023-06-11 16:48:10.893718

"""
import sqlalchemy as sa

from alembic import op

# revision identifiers, used by Alembic.
revision = 'e0f0eb30638a'
down_revision = 'd65783c9d74f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('orders', sa.Column('packer_user_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'orders', 'users', ['packer_user_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'orders', type_='foreignkey')
    op.drop_column('orders', 'packer_user_id')
    # ### end Alembic commands ###
